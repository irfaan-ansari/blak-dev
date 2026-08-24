import z from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "Required"),
  phoneNumber: z.string().min(1, "Required"),
  email: z.email(),
  role: z.string(),
  password: z.string().min(8, "Must be 8 or more characters"),
  confirmPassword: z.string().min(1, "Required"),
  callbackURL: z.string().optional(),
})

export type RegisterValue = z.infer<typeof registerSchema>

export const registerActionSchema = z.object({
  data: registerSchema,
})
