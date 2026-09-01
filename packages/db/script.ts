import "dotenv"
import { ComplianceType, EntityType, prisma } from "./dist/index.js"

const main = async () => {
  const countries = await prisma.country.findMany({
    include: {
      currency: true,
    },
  })

  // Create markets
  const markets = await Promise.all(
    countries.map((country) =>
      prisma.market.upsert({
        where: {
          iso2: country.iso2,
        },
        update: {
          name: country.name,
          currencyId: country.currencyId,
          countryId: country.id,
        },
        create: {
          name: country.name,
          currencyId: country.currencyId,
          iso2: country.iso2,
          countryId: country.id,
          status: "ACTIVE",
          scope: "COUNTRY",
        },
      })
    )
  )

  // Generic compliance requirements
  const requirements = {
    DRIVER: [
      {
        name: "DRIVING_LICENSE",
        label: "Driving Licence",
        type: "DOCUMENT",
      },
      {
        name: "GOVERNMENT_ID",
        label: "Government ID",
        type: "DOCUMENT",
      },
      {
        name: "MEDICAL_CERTIFICATE",
        label: "Medical / Fitness Certificate",
        type: "DOCUMENT",
      },
      {
        name: "DRIVER_TRAINING",
        label: "Driver Training Certificate",
        type: "DOCUMENT",
      },
    ],

    OPERATOR: [
      {
        name: "BUSINESS_REGISTRATION",
        label: "Business Registration Certificate",
        type: "DOCUMENT",
      },
      {
        name: "TAX_REGISTRATION",
        label: "Tax Registration Certificate",
        type: "DOCUMENT",
      },
      {
        name: "OPERATING_LICENSE",
        label: "Operating / Transport Licence",
        type: "DOCUMENT",
      },
      {
        name: "LIABILITY_INSURANCE",
        label: "Liability Insurance",
        type: "DOCUMENT",
      },
      {
        name: "COMMERCIAL_TRANSPORT_PERMIT",
        label: "Commercial Transport Permit",
        type: "DOCUMENT",
      },
      {
        name: "BUSINESS_ADDRESS_PROOF",
        label: "Business Address Proof",
        type: "DOCUMENT",
      },
      {
        name: "AUTHORIZED_SIGNATORY_ID",
        label: "Authorized Signatory Identification",
        type: "DOCUMENT",
      },
      {
        name: "SAFETY_COMPLIANCE_CERTIFICATE",
        label: "Safety / Compliance Certificate",
        type: "DOCUMENT",
      },
      {
        name: "DRIVER_EMPLOYMENT_COMPLIANCE",
        label: "Driver Employment / Compliance Documentation",
        type: "DOCUMENT",
      },
      {
        name: "BUSINESS_INSURANCE",
        label: "Business Insurance Certificate",
        type: "DOCUMENT",
      },
    ],

    VEHICLE: [
      {
        name: "VEHICLE_REGISTRATION",
        label: "Vehicle Registration Certificate",
        type: "DOCUMENT",
      },
      {
        name: "VEHICLE_INSURANCE",
        label: "Vehicle Insurance",
        type: "DOCUMENT",
      },
      {
        name: "VEHICLE_INSPECTION",
        label: "Vehicle Inspection / Roadworthiness Certificate",
        type: "DOCUMENT",
      },
      {
        name: "COMMERCIAL_PERMIT",
        label: "Commercial Vehicle Permit",
        type: "DOCUMENT",
      },
      {
        name: "EMISSION_CERTIFICATE",
        label: "Emission / Environmental Certificate",
        type: "DOCUMENT",
      },
      {
        name: "OWNERSHIP_PROOF",
        label: "Vehicle Ownership / Lease Agreement",
        type: "DOCUMENT",
      },
    ],
  }

  // Create compliance requirements for every market
  await prisma.complianceRequirement.createMany({
    data: markets.flatMap((market) =>
      Object.entries(requirements).flatMap(([entityType, items]) =>
        items.map((item) => ({
          marketId: market.id,
          entityType: entityType as EntityType,
          name: item.name,
          label: item.label,
          type: item.type as ComplianceType,
          isRequired: true,
        }))
      )
    ),
    skipDuplicates: true,
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
