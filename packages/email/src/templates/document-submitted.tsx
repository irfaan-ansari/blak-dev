import { Template } from "./template"
import { Text } from "react-email"

interface DocumentsSubmittedEmailProps {
  name: string
}

export const DocumentsSubmittedEmail = ({
  name,
}: DocumentsSubmittedEmailProps) => (
  <Template title="Documents submitted">
    <Text className="font-14 text-card-fg mx-auto mt-0 mb-6 max-w-95 text-center font-sans">
      <strong>{name}</strong> has submitted documents for review.
    </Text>

    <Text className="font-14 text-card-fg mx-auto mt-0 mb-8 max-w-95 text-center font-sans">
      The submission is ready for verification. Review the uploaded documents
      and take the appropriate action in the BLAK Admin Portal.
    </Text>

    <Text className="font-13 text-muted-fg mx-auto mt-8 mb-0 max-w-100 text-center font-sans">
      This is an internal BLAK notification. No action has been communicated to
      the operator yet.
    </Text>
  </Template>
)

DocumentsSubmittedEmail.PreviewProps = {
  name: "Premier Chauffeur Services",
} satisfies DocumentsSubmittedEmailProps

export default DocumentsSubmittedEmail
