import { Flex, Text } from "@chakra-ui/react";

export default function DeletedLabel({ preText, children }) {
  return (
    <Flex gap={1} alignItems={"center"}>
      {preText}
      <Text fontStyle={"italic"} color={"gray.500"}>
        {children}
      </Text>
    </Flex>
  );
}
