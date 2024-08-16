import { Container as ChakraContainer } from "@chakra-ui/react";

export default function Container({ children, ...rest }) {
  return (
    <ChakraContainer
      maxW={"container.lg"}
      minH={"100vh"}
      display={"flex"}
      flexDir={"column"}
      {...rest}
    >
      {children}
    </ChakraContainer>
  );
}
