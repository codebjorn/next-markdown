import { Container, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { FC, ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type LayoutHeadProps = {
  title?: string;
  meta?: { name: string; content: string }[];
  link?: { rel: string; href: string }[];
};

type LayoutProps = {
  head?: LayoutHeadProps;
  children: ReactNode;
};

const LayoutHead: FC<LayoutHeadProps> = ({ title, meta, link }) => (
  <Head>
    <title>{title ?? "Blog"}</title>

    <meta name="description" content="This is blog" />
    {meta &&
      meta.map(({ name, content }) => (
        <meta key={name} name={name} content={content} />
      ))}

    <link rel="icon" href="/favicon.ico" />
    {link &&
      link.map(({ rel, href }, index) => (
        <link key={index} rel={rel} href={href} />
      ))}
  </Head>
);

export const Layout: FC<LayoutProps> = ({ children, head }) => (
  <VStack>
    <LayoutHead title={head?.title} meta={head?.meta} link={head?.link} />
    <Header />
    <Container py={10} width="100%">{children}</Container>
    <Footer />
  </VStack>
);
