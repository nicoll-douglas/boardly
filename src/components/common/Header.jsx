import { Flex } from "@chakra-ui/react";

export default function Header({ children }) {
  return (
    <Flex alignItems={"center"} height={16}>
      {children}
    </Flex>
  );
}
