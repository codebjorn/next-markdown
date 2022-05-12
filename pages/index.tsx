import { Heading, Text, Stack, Box, SimpleGrid } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { Card, CardProps, Layout } from "../components";
import { Articles } from "../services";

type HomeProps = {
  articles: CardProps[];
};

const Home: NextPage<HomeProps> = ({ articles }) => {
  return (
    <Layout>
      <Stack spacing={6} textAlign="center">
        <Heading as="h1" size="3xl">
          Blog
        </Heading>
        <Text>
          Hello everyone, this is simple blog build on Next.js using Markdown.
        </Text>
      </Stack>
      <SimpleGrid mt={10} columns={2} spacing={10}>
        {articles.map(({ date, title, excerpt, url }, index) => (
          <Card
            key={index}
            date={date}
            title={title}
            excerpt={excerpt}
            url={url}
          />
        ))}
      </SimpleGrid>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const articles = await Articles.make().getAll();

  console.log(articles);
  
  return {
    props: {
      articles,
    },
  };
};

export default Home;
