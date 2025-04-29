import { Flex, Image, Heading, Text } from "@chakra-ui/react";

export default function NothingToShow({ imageSrc, heading, text }) {
  return (
    <Flex flexDir={"column"} alignItems={"center"} textAlign={"center"}>
      <Image src={imageSrc} w={220} h={220} />
      <Heading size={"sm"} mb={1}>
        {heading}
      </Heading>
      <Text>{text}</Text>
    </Flex>
  );
}
