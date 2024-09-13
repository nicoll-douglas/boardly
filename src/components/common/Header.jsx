import { Flex } from "@chakra-ui/react";

export default function Header({ children }) {
  return (
    <Flex
      alignItems={"center"}
      height={"72px"}
      position={"sticky"}
      top={0}
      px={4}
      as={"header"}
      zIndex={100}
      style={{
        backdropFilter: "blur(10px)",
      }}
    >
      {children}
    </Flex>
  );
}
