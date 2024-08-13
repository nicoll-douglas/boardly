import { Container as ChakraContainer } from "@chakra-ui/react";

export default function Container({ children }) {
  return (
    <ChakraContainer
      maxW={"container.lg"}
      minH={"100vh"}
      display={"flex"}
      flexDir={"column"}
    >
      {children}
    </ChakraContainer>
  );
}
