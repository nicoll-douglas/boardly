import { Flex } from "@chakra-ui/react";

export default function Header({ children }) {
  return (
    <Flex alignItems={"center"} height={"72px"} position={"sticky"} top={0}>
      {children}
    </Flex>
  );
}
