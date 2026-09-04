import { z } from "zod"

export const accountFormSchema = z.object({
  name: z.string().min(2, "Operating name is required"),
  legalName: z.string().min(2, "Legal name is required"),
  website: z.string(),
  email: z.email("Enter a valid email address"),
  phoneNumber: z.string(),
  registrationNo: z.string().optional(),
  taxId: z.string().optional(),
  contactName: z.string().min(2, "Contact name is required"),
  contactTitle: z.string().min(2, "Contact title is required"),
  contactEmail: z.email("Enter a valid contact email"),
  contactPhone: z.string(),
  metadata: z.object({
    address: z.string().min(2, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State / Province is required"),
    pincode: z.string().min(2, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),
})
export type AccountFormValues = z.infer<typeof accountFormSchema>
