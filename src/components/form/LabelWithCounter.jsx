import { Flex, Text, FormLabel } from "@chakra-ui/react";

export default function LabelWithCounter({ maxLength, length, children }) {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"}>
      <FormLabel flex={1}>{children}</FormLabel>
      <Text
        fontSize={"sm"}
        mb={2}
        color={length > maxLength ? "red.400" : "inherit"}
      >
        {length}
      </Text>
    </Flex>
  );
}
