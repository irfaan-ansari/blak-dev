"use client"

import React from "react"

import { useParams } from "next/navigation"

import { useOperatorApplication } from "@/features/onboarding/operator/operator.data"

import { Badge } from "@blak/ui/components/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { PageSkeleton } from "@blak/ui/components/blak/empty-state"
import { Separator } from "@blak/ui/components/separator"

const OperatorPage = () => {
  const params = useParams()
  const id = params?.id as string

  const { data, isPending } = useOperatorApplication(id)

  if (isPending) return <PageSkeleton />

  const application = data?.data
  const operator = application?.application

  if (!application || !operator) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Operator application not found.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      {/* Left */}
      <div className="min-w-0 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Vehicles" value={operator.vehicleCount} />
          <StatCard label="Chauffeurs" value={operator.chauffeurCount} />
          <StatCard label="Years operating" value={operator.yearsInOperation} />
          <StatCard label="Country" value={operator.country} />
        </div>

        <SectionCard title="Business information">
          <Field
            label="Legal business name"
            value={operator.legalBusinessName}
          />

          <Field label="Operating name" value={operator.operatingName} />

          <Field
            label="Business type"
            value={formatLabel(operator.businessType)}
          />

          <Field label="Business email" value={operator.businessEmail} />

          <Field label="Business phone" value={operator.businessPhone} />

          <Field label="Website" value={operator.website} />
        </SectionCard>

        <SectionCard title="Business location">
          <Field label="Address" value={operator.address} />

          <Field label="City" value={operator.city} />

          <Field label="State / Province" value={operator.state} />

          <Field label="Postal code" value={operator.pincode} />

          <Field label="Country" value={operator.country} />
        </SectionCard>

        <SectionCard title="Operations">
          <div className="grid gap-3 md:grid-cols-2">
            <Field
              label="Years in operation"
              value={operator.yearsInOperation}
            />

            <Field label="Vehicle count" value={operator.vehicleCount} />

            <Field label="Chauffeur count" value={operator.chauffeurCount} />

            <Field
              label="Licensed & insured"
              value={
                <BooleanBadge value={operator.commerciallyLicensedInsured} />
              }
            />

            <Field
              label="Luxury sedans / SUVs"
              value={<BooleanBadge value={operator.operatesLuxurySedansSuvs} />}
            />
          </div>

          <Separator className="my-5" />

          <div className="space-y-5">
            <div>
              <p className="mb-2 text-sm text-muted-foreground">
                Operating markets
              </p>

              <div className="flex flex-wrap gap-2">
                {operator.operatingMarkets?.length ? (
                  operator.operatingMarkets.map((market) => (
                    <Badge key={market} variant="secondary">
                      {formatLabel(market)}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-muted-foreground">
                Service types
              </p>

              <div className="flex flex-wrap gap-2">
                {operator.serviceTypes?.length ? (
                  operator.serviceTypes.map((service) => (
                    <Badge key={service} variant="outline">
                      {formatLabel(service)}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Right sidebar */}

      <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
        <SectionCard title="Primary contact">
          <Field label="Name" value={application.contactName} />

          <Field label="Title" value={application.contactTitle} />

          <Field label="Phone" value={application.contactPhone} />

          <Field label="Email" value={application.contactEmail} />
        </SectionCard>
        <SectionCard title="Application">
          <Field
            label="Status"
            value={<StatusBadge status={application.currentStatus} />}
          />

          <Field label="Created" value={formatDate(application.createdAt)} />

          <Field
            label="Submitted"
            value={formatDate(application.submittedAt)}
          />

          <Field label="Decision" value={formatDate(application.decidedAt)} />

          <Field label="Updated" value={formatDate(application.updatedAt)} />

          {application.rejectionReason && (
            <>
              <Separator className="my-4" />

              <Field
                label="Rejection reason"
                value={application.rejectionReason}
              />
            </>
          )}
        </SectionCard>

        <SectionCard title="Internal">
          <Field
            label="Application ID"
            value={
              <span className="font-mono text-xs break-all">
                {application.id}
              </span>
            }
          />

          <Field
            label="Organization ID"
            value={
              <span className="font-mono text-xs break-all">
                {application.organizationId}
              </span>
            }
          />

          <Field label="Market ID" value={application.marketId} />

          <Field label="Invitation ID" value={application.invitationId} />
        </SectionCard>
      </aside>
    </div>
  )
}

export default OperatorPage

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Card size="sm">
      <CardContent>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-lg font-semibold">{value ?? "—"}</p>
      </CardContent>
    </Card>
  )
}

function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>

      <div className="min-w-0 font-medium">
        {value === null || value === undefined || value === "" ? "—" : value}
      </div>
    </div>
  )
}

function SectionCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Card size="sm">
      <CardHeader className="border-b">
        <CardTitle className="font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  )
}

function BooleanBadge({ value }: { value: boolean }) {
  return (
    <Badge variant={value ? "secondary" : "outline"}>
      {value ? "Yes" : "No"}
    </Badge>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={status === "REJECTED" ? "destructive" : "secondary"}>
      {formatLabel(status)}
    </Badge>
  )
}

function formatLabel(value?: string | null) {
  if (!value) return "—"

  return value
    .replace(/_/g, "-")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

function formatDate(value?: Date | string | null) {
  if (!value) return "—"

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}
