import { Button, Section, Text } from "react-email"

import { Template } from "./template"

interface AccountApprovedEmailProps {
  url: string
}

export const AccountApprovedEmail = ({ url }: AccountApprovedEmailProps) => (
  <Template title="Your account has been approved">
    <Text className="font-14 text-card-fg mx-auto mt-0 mb-8 max-w-95 text-center font-sans">
      Your BLAK operator account has been approved and is now active on the BLAK
      network. You can access your portal to manage your account, vehicles,
      drivers, and other operational information.
    </Text>

    <Section className="mb-6 text-center">
      <Button
        href={url}
        className="bg-brand font-16 text-inverted-fg inline-block rounded-lg px-6 py-3 text-center font-sans leading-6"
      >
        Go to portal
      </Button>
    </Section>

    <Text className="font-13 text-muted-fg mx-auto mt-8 mb-0 max-w-100 text-center font-sans">
      If you have any questions or need assistance, please contact the BLAK
      support team.
    </Text>
  </Template>
)

AccountApprovedEmail.PreviewProps = {
  url: "https://operator.rideblak.com",
} satisfies AccountApprovedEmailProps

export default AccountApprovedEmail
