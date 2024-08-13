import { Container as ChakraContainer } from "@chakra-ui/react";

export default function Container({ children }) {
  return (
    <ChakraContainer maxW={"5xl"} borderWidth={1} minH={"100vh"}>
      {children}
    </ChakraContainer>
  );
}
