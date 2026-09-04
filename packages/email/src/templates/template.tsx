import { Body,  Column, Container, Head, Heading, Html, Img, Link, Row, Section, Tailwind,Text } from "react-email"
import { Fonts } from "../config/font"
import { style } from "../config/style"

const baseUrl = 'https://rideblak.com/logo/logo.png'

export const Header = ({ title }: { title: string }) => {
  return <Section className="mb-3">
    <Img
      src={`${baseUrl}/static/shared/logo-black.png`}
      alt="Logo"
      width={48}
      className="mx-auto mb-5 block"
    />
    <Heading as="h1" className="font-28 text-fg m-0 font-sans">
      {title}
    </Heading>
  </Section>
}
export const Footer = () => {
  return (<Section className="bg-bg">
    <Row>
      <Column className="px-6 py-10 text-center">
        <Text className="font-13 text-fg-3 mx-auto mt-0 mb-8 max-w-[280px] text-center font-sans">
        A First Class Experience
        </Text>

        <Text className="font-11 text-fg-3 mt-4 mb-5 text-center font-sans">
        BLAK connects trusted ground transportation operators under one consistent standard of service, 
        ensuring every journey meets the expectations of a First Class Experience.
        </Text>
        <Text className="font-11 text-fg-3 m-0 text-center font-sans">
        Need help?
          <Link href="https://example.com/" className="text-fg-3">
           Contact the BLAK support team.
          </Link>
        </Text>
      </Column>
    </Row>
  </Section>)
}

export const Template = ({ title,children }: { title:string,children: React.ReactNode }) => {
  return <Tailwind config={style}>
    <Html>
      <Head>
        <Fonts />
      </Head>
      <Body className="bg-bg-2 m-0 text-center font-sans">

        <Container className="mobile:mt-0 mx-auto mt-8 w-full max-w-[640px]">
          <Section>
            <Section className="bg-bg mobile:px-2 px-6 py-4">
              <Section className="bg-bg-2 mobile:px-6 mobile:py-12 rounded-[8px] px-[40px] py-[64px] text-center">
                {/* header */}
                <Header title={title} />

                {children}
              </Section>

              {/* Footer */}
              <Footer/>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
}
