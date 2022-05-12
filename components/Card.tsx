import { Box, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { FC } from "react";

export type CardProps = {
  date: string;
  title: string;
  excerpt: string;
  url?: string;
};

export const Card: FC<CardProps> = ({ date, title, excerpt, url }) => {
  return (
    <LinkBox _hover={{ opacity: "0.65" }}>
      {url && <LinkOverlay href={url}></LinkOverlay>}
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
            >
              {date}
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {title}
          </Box>

          <Box>{excerpt}</Box>
        </Box>
      </Box>
    </LinkBox>
  );
};
