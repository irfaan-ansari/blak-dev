import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from "react-email"
import { Fonts } from "../config/font"
import { style } from "../config/style"

const baseUrl = "https://web.rideblak.com"

export const Header = ({ title }: { title: string }) => {
  return (
    <Section className="mb-3">
      <Img
        src={`${baseUrl}/logo/logo.png`}
        alt="Logo"
        width={120}
        className="mx-auto mb-10 block"
      />
      <Heading as="h1" className="font-24 text-fg m-0 font-sans">
        {title}
      </Heading>
    </Section>
  )
}
export const Footer = () => {
  return (
    <Section className="bg-bg">
      <Row>
        <Column className="px-6 py-10 text-center">
          <Text className="font-16 text-card-fg mx-auto mt-0 mb-8 max-w-70 text-center font-sans">
            A First Class Experience
          </Text>

          <Text className="font-11 text-muted-fg mt-4 mb-5 text-center font-sans">
            BLAK connects trusted ground transportation operators under one
            consistent standard of service, ensuring every journey meets the
            expectations of a First Class Experience.
          </Text>
          <Text className="font-11 text-muted-fg m-0 text-center font-sans">
            Need help?{" "}
            <Link href="mailto:inquiry@rideblak.com" className="text-brand">
              Contact our Support Team.
            </Link>
          </Text>
        </Column>
      </Row>
    </Section>
  )
}

export const Template = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <Tailwind config={style}>
      <Html>
        <Head>
          <Fonts />
        </Head>
        <Body className="m-0 bg-[#f4f4f4] text-center font-sans">
          <Container className="mx-auto mt-8 mb-8 w-full max-w-160">
            <Section>
              <Section className="bg-bg mobile:px-2 px-6 py-6">
                <Section className="border-stroke mobile:px-6 mobile:py-12 rounded-[12px] border bg-card px-10 py-16 text-center">
                  {/* header */}
                  <Header title={title} />

                  {children}
                </Section>

                {/* Footer */}
                <Footer />
              </Section>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
