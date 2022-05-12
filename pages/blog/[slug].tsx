import { Box, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { Layout } from "../../components";
import { ArticleData, Articles } from "../../services";

type ArticleProps = { article: ArticleData };

type StaticParams = {
  params: {
    slug: string;
  };
};

const Article: NextPage<ArticleProps> = ({
  article: { date, title, html },
}) => {
  return (
    <Layout head={{ title }}>
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
      >
        {date}
      </Box>
      <Heading as="h1" size="3xl" my={10}>
        {title}
      </Heading>
      <Box
        sx={{
          "pre code": { whiteSpace: "initial" },
          "*": { margin: "10px 0" },
        }}
      >
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Box>
    </Layout>
  );
};

export const getStaticProps = async ({ params }: StaticParams) => {
  const article = await Articles.make().get(params.slug);

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths = async () => {
  const slugs = Articles.make().getSlugs();

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug: slug,
        },
      };
    }),
    fallback: false,
  };
};

export default Article;
