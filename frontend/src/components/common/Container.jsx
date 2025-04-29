import { Container as ChakraContainer } from "@chakra-ui/react";

export default function Container({ children, ...rest }) {
  return (
    <ChakraContainer
      maxW={"8xl"}
      minH={"100vh"}
      display={"flex"}
      flexDir={"column"}
      px={0}
      {...rest}
    >
      {children}
    </ChakraContainer>
  );
}
