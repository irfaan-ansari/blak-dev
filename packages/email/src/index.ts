import { Resend } from "resend"
import { ReactElement } from "react"

export const resend = new Resend(process.env.RESEND_API_KEY)

type SendEmailOptions = {
  to: string | string[]
  subject: string
  template: ReactElement
  from?: string
  replyTo?: string
}

export async function sendEmail({
  to,
  subject,
  template,
  from = "noreply@rideblak.com",
  replyTo,
}: SendEmailOptions) {
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    react: template,
    replyTo,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
