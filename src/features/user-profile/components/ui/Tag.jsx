import { Tag as ChakraTag } from "@chakra-ui/react";

export default function Tag({ children, ...rest }) {
  return (
    <ChakraTag size={"sm"} h={6} {...rest}>
      {children}
    </ChakraTag>
  );
}
