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
  <Template title="Complete your operator setup">
    <Text className="font-14 text-card-fg mx-auto mt-0 mb-6 max-w-95 text-center font-sans">
      Hello {name},
    </Text>

    <Text className="font-14 text-card-fg mx-auto mt-0 mb-8 max-w-95 text-center font-sans">
      Your BLAK company profile has been created. The next step is to add the
      vehicles and chauffeurs you want to make available through the BLAK
      network.
    </Text>

    <Section className="mb-8 text-center">
      <Text className="font-14 text-fg m-0 mb-2 font-sans font-medium">
        Add your vehicles
      </Text>
      <Text className="font-14 text-fg m-0 mb-2 font-sans font-medium">
        Add your chauffeurs
      </Text>
      <Text className="font-14 text-fg m-0 font-sans font-medium">
        Upload the required documents
      </Text>
    </Section>

    <Text className="font-14 text-card-fg mx-auto mt-0 mb-6 max-w-95 text-center font-sans">
      You do not need to add your entire fleet. Only add the vehicles and
      chauffeurs you intend to make available for BLAK trips.
    </Text>

    <Text className="font-14 text-card-fg mx-auto mt-0 mb-8 max-w-95 text-center font-sans">
      For larger fleets, you can use the Bulk Upload option inside the portal.
    </Text>

    <Section className="mb-6 text-center">
      <Button
        href={url}
        className="bg-brand font-16 text-inverted-fg inline-block rounded-lg px-6 py-3 text-center font-sans leading-6"
      >
        Continue onboarding
      </Button>
    </Section>
  </Template>
)

OnboardingReminderEmail.PreviewProps = {
  name: "John",
  url: "https://example.com/",
} satisfies OnboardingReminderEmailProps

export default OnboardingReminderEmail
