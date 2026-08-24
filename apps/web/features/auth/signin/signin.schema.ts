import z from "zod"

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(3, "Required"),
})

export type SigninValue = z.infer<typeof signinSchema>
