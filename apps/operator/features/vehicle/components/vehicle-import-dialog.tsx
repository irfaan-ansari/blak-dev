"use client"

import {
  AppDrawer,
  AppDrawerContent,
  AppDrawerHeader,
  AppDrawerTitle,
  AppDrawerTrigger,
} from "@blak/ui/components/blak/app-drawer"
import { Button } from "@blak/ui/components/button"
import { FieldGroup } from "@blak/ui/components/field"
import { cn } from "@blak/ui/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { CloudUpload, Download, FileText, X } from "lucide-react"
import Papa from "papaparse"
import React from "react"
import { toast } from "sonner"

import { importVehicles } from "../vehicle.action"
import { REQUIRED_FIELDS, SAMPLE_CSV } from "../vehicle.sampeCSV"
import { VehicleImportRow } from "../vehicle.type"

const HEADER_NAMES: Record<string, keyof VehicleImportRow> = {
  year: "year",
  make: "make",
  model: "model",
  trim: "trim",
  interiorcolor: "interiorColor",
  exteriorcolor: "exteriorColor",
  engine: "engine",
  licenseplate: "licensePlate",
  registrationnumber: "registrationNumber",
  vin: "vin",
  registrationexpiry: "registrationExpiry",
}

export const VehicleImportDialog = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = React.useState(false)
  const [file, setFile] = React.useState<File | null>(null)
  const [vehicles, setVehicles] = React.useState<VehicleImportRow[]>([])
  const [isUploading, setIsUploading] = React.useState(false)

  const [importResult, setImportResult] = React.useState<{
    count: number
    imported: number[]
    errors: Array<{ row: number; message: string }>
  } | null>(null)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const resetImport = () => {
    setFile(null)
    setVehicles([])
    setImportResult(null)
  }

  const handleFile = (selectedFile: File) => {
    const isCsv =
      selectedFile.type === "text/csv" ||
      selectedFile.name.toLowerCase().endsWith(".csv")

    if (!isCsv) {
      toast.error("Please select a CSV file")
      return
    }

    Papa.parse<VehicleImportRow>(selectedFile, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        const normalized = header
          .replace(/^\uFEFF/, "")
          .trim()
          .toLowerCase()
          .replace(/[\s_-]/g, "")
        return HEADER_NAMES[normalized] ?? header.trim()
      },

      complete: (results) => {
        if (results.errors.length > 0) {
          toast.error(results.errors[0]?.message ?? "Invalid CSV file")
          return
        }

        const headers = results.meta.fields ?? []

        if (headers.length === 0) {
          toast.error("The first row must contain the CSV headers")
          return
        }

        const missingFields = REQUIRED_FIELDS.filter(
          (field) => !headers.includes(field)
        )

        if (missingFields.length > 0) {
          toast.error(`Missing columns: ${missingFields.join(", ")}`)
          return
        }

        const rows = results.data
          .map((row, index) => ({
            ...row,
            originalRowNumber: index + 2,
          }))
          .filter((row) =>
            Object.entries(row).some(
              ([key, value]) =>
                key !== "originalRowNumber" &&
                String(value ?? "").trim().length > 0
            )
          )

        if (rows.length === 0) {
          toast.error("The CSV file is empty")
          return
        }

        setFile(selectedFile)
        setVehicles(rows)
      },

      error: (error) => {
        console.error(error)
        toast.error("Unable to read CSV file")
      },
    })
  }

  const handleImport = async () => {
    if (!file || vehicles.length === 0) {
      toast.error("Please select a valid CSV file")
      return
    }

    setIsUploading(true)

    try {
      const { serverError, data } = await importVehicles({
        data: vehicles,
      })

      if (serverError || !data) {
        toast.error(serverError?.message ?? "Unable to import vehicles")
        return
      }

      const count = data.count
      setImportResult({ count, imported: data.imported, errors: data.errors })
      if (data.errors.length > 0) {
        const failedRows = new Set(data.errors.map((error) => error.row))
        setVehicles((rows) =>
          rows.filter((row, index) =>
            failedRows.has(row.originalRowNumber ?? index + 2)
          )
        )
      }

      if (count > 0)
        toast.success(
          `${count} vehicle${count === 1 ? "" : "s"} imported successfully`
        )
      if (data.errors.length > 0)
        toast.error(
          `${data.errors.length} row${data.errors.length === 1 ? "" : "s"} failed to import`
        )

      await queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      })

      if (data.errors.length === 0) {
        resetImport()
        setOpen(false)
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to import vehicles")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownloadSample = () => {
    const blob = new Blob([SAMPLE_CSV], {
      type: "text/csv;charset=utf-8;",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.download = "vehicle-sample.csv"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  const handleOpenChange = (value: boolean) => {
    setOpen(value)

    if (!value) {
      resetImport()
    }
  }

  return (
    <AppDrawer open={open} onOpenChange={handleOpenChange}>
      <AppDrawerTrigger asChild>{children}</AppDrawerTrigger>

      <AppDrawerContent className="sm:max-w-2xl">
        <AppDrawerHeader>
          <AppDrawerTitle className="text-base font-semibold">
            Import vehicle data
          </AppDrawerTitle>
        </AppDrawerHeader>

        <FieldGroup>
          <input
            ref={inputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0]

              if (selectedFile) {
                handleFile(selectedFile)
              }

              event.target.value = ""
            }}
          />

          {!file ? (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className={cn(
                "flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed bg-secondary/20 transition-colors",
                "hover:bg-secondary/50"
              )}
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-secondary">
                <CloudUpload className="size-5" />
              </div>

              <div className="space-y-1 text-center">
                <p className="text-sm font-medium">Upload a CSV file</p>

                <p className="text-xs text-muted-foreground">Click to browse</p>
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary">
                <FileText className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>

                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                  {" · "}
                  {vehicles.length} vehicle
                  {vehicles.length === 1 ? "" : "s"}
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={isUploading}
                onClick={resetImport}
              >
                <X className="size-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-md bg-secondary">
                <FileText className="size-4" />
              </div>

              <div>
                <p className="text-sm font-medium">Need a template?</p>

                <p className="text-xs text-muted-foreground">
                  Download a sample CSV with the required columns.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadSample}
            >
              <Download className="size-4" />
              Download sample
            </Button>
          </div>

          {importResult && (
            <div className="space-y-2 rounded-lg border p-3 text-sm">
              <p className="font-semibold">
                Imported {importResult.count} vehicle
                {importResult.count === 1 ? "" : "s"}
              </p>
              {importResult.errors.length > 0 && (
                <div className="max-h-32 space-y-1 overflow-auto text-destructive">
                  {importResult.errors.map((error) => (
                    <p key={error.row}>
                      Row {error.row}: {error.message}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="min-w-28"
              disabled={isUploading}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              className="min-w-28"
              disabled={!file || vehicles.length === 0 || isUploading}
              onClick={handleImport}
            >
              {isUploading ? "Importing..." : "Import"}
            </Button>
          </div>
        </FieldGroup>
      </AppDrawerContent>
    </AppDrawer>
  )
}
