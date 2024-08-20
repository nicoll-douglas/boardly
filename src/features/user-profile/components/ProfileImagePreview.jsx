import { Flex, Heading, Avatar } from "@chakra-ui/react";

export default function ProfileImagePreview({ src }) {
  if (!src) return;

  return (
    <Flex
      flexDir={"column"}
      mx={"auto"}
      maxW={"fit-content"}
      alignItems={"center"}
    >
      <Heading size={"sm"} mb={2}>
        Preview
      </Heading>
      <Avatar mb={6} size={"xl"} src={src} />
    </Flex>
  );
}
