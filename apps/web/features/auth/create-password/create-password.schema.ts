import z from "zod"

export const createPasswordSchema = z.object({
  password: z.string().min(8, "Must be 8 or more characters"),
  confirmPassword: z.string().min(1, "Required"),
})

export type CreatePasswordValues = z.infer<typeof createPasswordSchema>
