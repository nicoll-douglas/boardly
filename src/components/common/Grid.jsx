import { Grid as ChakraGrid } from "@chakra-ui/react";

export default function Grid({ children, rest }) {
  return (
    <ChakraGrid
      flex={1}
      templateColumns={"repeat(12, 1fr)"}
      templateRows={"repeat(12, 1fr)"}
      gap={4}
      py={4}
      {...rest}
    >
      {children}
    </ChakraGrid>
  );
}
