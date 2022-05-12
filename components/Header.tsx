import { FC } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { Logo } from "./Logo";

export const Header: FC = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Box as="header" width="100%">
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow={useColorModeValue("sm", "sm-dark")}
      >
        <Container py={{ base: "4", lg: "5" }}>
          <HStack spacing="10" justify="space-between">
            <Logo />
            {isDesktop ? (
              <ButtonGroup variant="link" spacing="8">
                {["All", "About Us", "Contacts"].map((item) => (
                  <Button key={item} fontWeight="normal" color="black">{item}</Button>
                ))}
              </ButtonGroup>
            ) : (
              <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};
