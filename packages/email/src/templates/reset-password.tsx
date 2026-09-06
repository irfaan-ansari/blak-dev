import { Template } from "./template"
import { Button, Section, Text } from "react-email"

interface PasswordResetEmailProps {
  url: string
}

export const PasswordResetEmail = ({ url }: PasswordResetEmailProps) => (
  <Template title="Create your password">
    <Text className="font-14 text-card-fg mx-auto mt-0 mb-6 max-w-95 text-center font-sans">
      We apologize for the inconvenience. The password link in our previous
      email may have expired. Please use the new link below to create your BLAK
      account password.
    </Text>

    <Section className="mb-6 text-center">
      <Button
        href={url}
        className="bg-brand font-16 text-inverted-fg inline-block rounded-lg px-6 py-3 text-center font-sans leading-6"
      >
        Create password
      </Button>
    </Section>

    <Text className="font-13 text-muted-fg mx-auto mt-8 mb-0 max-w-100 text-center font-sans">
      If you have already created your password, no further action is required
      and you can safely ignore this email.
    </Text>
  </Template>
)

PasswordResetEmail.PreviewProps = {
  url: "https://www.rideblak.com/auth/create-password?token=example",
} satisfies PasswordResetEmailProps

export default PasswordResetEmail
