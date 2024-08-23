import { Grid as ChakraGrid } from "@chakra-ui/react";

export default function Grid({ children, ...rest }) {
  return (
    <ChakraGrid
      flex={1}
      templateColumns={"repeat(12, 1fr)"}
      gap={4}
      pb={4}
      {...rest}
    >
      {children}
    </ChakraGrid>
  );
}
