import { z } from "zod"

export const businessSchema = z.object({
  legalBusinessName: z.string().min(2, "Legal company name is required"),
  operatingName: z.string(),
  businessType: z.string().min(1, "Business type is required"),
  website: z.string(),
  businessEmail: z.email("Enter a valid business email"),
  businessPhone: z.string().min(6, "Enter a valid business phone number"),
})

export const locationSchema = z.object({
  address: z.string().min(5, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(1, "Pincode is required"),
  country: z.string().min(1, "Country is required"),
})

export const contactSchema = z.object({
  contactName: z.string().min(2, "Contact name is required"),
  contactTitle: z.string().min(1, "Contact title is required"),
  contactEmail: z.email("Enter a valid email address"),
  contactPhone: z.string().min(6, "Enter a valid phone number"),
})

export const operationSchema = z.object({
  propertiesRooms: z.string().min(1, "Please provide an estimate"),
  monthlyBookings: z.string(),
  currentTransportation: z.string().min(1, "Please select an option"),
  transportationDetails: z.string(),
  transportationServices: z
    .array(z.string())
    .min(1, "Please select at least one service"),
})

export const partnershipSchema = z.object({
  partnershipUses: z
    .array(z.string())
    .min(1, "Please select at least one option"),
  additionalInformation: z.string().optional(),
  acknowledgment: z
    .boolean()
    .refine(
      (value) => value === true,
      "You must confirm that you are authorized to submit this application"
    ),
})

export const partnerSchema = z.object({
  ...businessSchema.shape,
  ...locationSchema.shape,
  ...contactSchema.shape,
  ...operationSchema.shape,
  ...partnershipSchema.shape,
})

export type PartnerSchema = z.infer<typeof partnerSchema>
