import { Flex } from "@chakra-ui/react";

export default function Header({ children }) {
  return (
    <Flex
      alignItems={"center"}
      height={"72px"}
      position={"sticky"}
      top={0}
      bg={"gray.800"}
      as={"header"}
      zIndex={100}
    >
      {children}
    </Flex>
  );
}
