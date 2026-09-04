// Get the full source code, including the theme and Tailwind config:
// https://github.com/resend/react-email/tree/canary/apps/demo/emails

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from 'react-email';
import { Fonts } from '../config/font';
import { style } from '../config/style';
import { Template } from './template';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

interface PasswordResetEmailProps {
  
  url: string;
}

export const PasswordResetEmail = ({
  
  url,
}: PasswordResetEmailProps) => (
  <Template title="Create you password">
  <Text className="font-16 text-fg-2 mx-auto mt-0 mb-8 max-w-[380px] text-center font-sans">
  Use the link below to create a new password and securely access your BLAK account.
                </Text>

                <Section className="mb-6 text-center">
                  <Button
                    href={url}
                    className="bg-fg font-16 text-fg-inverted inline-block rounded-lg px-7 py-4 text-center font-sans leading-6"
                  >
                    Change password
                  </Button>
                </Section>

                <Text className="font-13 text-fg-3 mx-auto mt-8 mb-0 max-w-[400px] text-center font-sans">
                  If you didn&apos;t request this, please ignore this email.
                  Your password won&apos;t change until you access the link
                  above and create a new one.
                </Text></Template>
);

PasswordResetEmail.PreviewProps = {
  url: 'https://example.com/',
} satisfies PasswordResetEmailProps;

export default PasswordResetEmail;
