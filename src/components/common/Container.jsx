import { Container as ChakraContainer } from "@chakra-ui/react";

export default function Container({ children }) {
  return (
    <ChakraContainer maxW={"container.xl"} minH={"100vh"}>
      {children}
    </ChakraContainer>
  );
}
