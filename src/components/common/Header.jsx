import { Flex, useColorModeValue } from "@chakra-ui/react";

export default function Header({ children }) {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Flex
      alignItems={"center"}
      height={"72px"}
      position={"sticky"}
      top={0}
      bg={bg}
      as={"header"}
      zIndex={100}
    >
      {children}
    </Flex>
  );
}
