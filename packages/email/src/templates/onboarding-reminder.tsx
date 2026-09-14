import { Template } from "./template"
import { Button, Section, Text } from "react-email"

interface OnboardingReminderEmailProps {
  name: string
  url: string
}

export const OnboardingReminderEmail = ({
  name,
  url,
}: OnboardingReminderEmailProps) => (
  <Template title="Get your fleet ready for BLAK trips">
    <Text className="font-14 text-card-fg mx-auto mt-0 mb-6 max-w-95 text-center font-sans">
      Hi {name},
    </Text>

    <Text className="font-14 text-card-fg mx-auto mt-0 mb-6 max-w-95 text-center font-sans">
      Your BLAK company profile is ready, and we are excited to have you on
      board. Add your vehicles and drivers to take the next step toward
      receiving trip requests through BLAK.
    </Text>

    <Text className="font-14 text-fg mx-auto mt-0 mb-8 max-w-95 text-center font-sans">
      Add all the vehicles and drivers you intend to make available for BLAK
      trips — the more you add, the more trips you can take on.
    </Text>

    <Text className="font-14 text-card-fg mx-auto mt-0 mb-8 max-w-95 text-center font-sans">
      For larger fleets, you can use the Bulk Upload option inside the portal.
    </Text>
    <Section className="mb-6 text-center">
      <Button
        href={url}
        className="bg-brand font-16 text-inverted-fg inline-block rounded-lg px-6 py-3 text-center font-sans leading-6"
      >
        Continue to Portal
      </Button>
    </Section>

    <Text className="font-14 text-card-fg mx-auto mt-0 mb-2 max-w-95 text-center font-sans">
      We look forward to working with you.
      <br />
      The BLAK Team
    </Text>
  </Template>
)

OnboardingReminderEmail.PreviewProps = {
  name: "John",
  url: "https://example.com/",
} satisfies OnboardingReminderEmailProps

export default OnboardingReminderEmail
