import { Flex, Text } from "@chakra-ui/react";

export default function DeletedLabel({
  preText,
  children,
  postText,
  size = "md",
}) {
  return (
    <Flex gap={1} alignItems={"center"} fontSize={size}>
      {preText}
      <Text fontStyle={"italic"} color={"gray.500"} fontSize={size}>
        {children}
      </Text>
      {postText}
    </Flex>
  );
}
