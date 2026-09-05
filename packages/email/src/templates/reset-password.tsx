import { Button, Section, Text } from "react-email"

import { Template } from "./template"

interface PasswordResetEmailProps {
  url: string
}

export const PasswordResetEmail = ({ url }: PasswordResetEmailProps) => (
  <Template title="Create you password">
    <Text className="font-14 text-card-fg mx-auto mt-0 mb-8 max-w-95 text-center font-sans">
      Use the link below to create a new password and securely access your BLAK
      account.
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
      If you didn&apos;t request this, please ignore this email. Your password
      won&apos;t change until you access the link above and create a new one.
    </Text>
  </Template>
)

PasswordResetEmail.PreviewProps = {
  url: "https://example.com/",
} satisfies PasswordResetEmailProps

export default PasswordResetEmail
