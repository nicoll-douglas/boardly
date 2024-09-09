import { VStack, Heading, Text, Image, Flex } from "@chakra-ui/react";
import RegisterBtn from "@/features/auth/components/RegisterBtn";
import chattingUrl from "@/assets/chatting.svg";

export default function Hero({ onJoin }) {
  return (
    <VStack gap={4} maxW={"2xl"} as={"main"}>
      <Heading
        as="h1"
        size={{ base: "2xl", sm: "3xl" }}
        wordBreak={"break-word"}
      >
        Expression, freedom, connection.
      </Heading>
      <Text fontSize={{ sm: "lg" }}>
        Browse threads, share your thoughts, participate in open dialogue or
        just come and hang out with like-minded people. Join the forum today.
      </Text>
      <Flex w={"full"} flexDir={{ base: "column", sm: "row" }}>
        <RegisterBtn
          maxW="fit-content"
          mt={{ base: 0, md: 4 }}
          size={{ base: "md", sm: "lg" }}
          onClick={onJoin}
        >
          Join for free
        </RegisterBtn>
        <Image
          src={chattingUrl}
          w={{ base: "300px", md: "380px" }}
          h={{ base: "300px", md: "380px" }}
          ml="auto"
          mt={-4}
          mr={{ sm: "auto", md: 0 }}
          alt="graphic displaying dialogue"
        />
      </Flex>
    </VStack>
  );
}
