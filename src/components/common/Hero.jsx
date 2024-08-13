import { VStack, Heading, Text, Image, Flex } from "@chakra-ui/react";
import catDarkUrl from "@/assets/cat-dark.svg";
import RegisterBtn from "@/features/auth/register/components/RegisterBtn";

export default function Hero() {
  return (
    <VStack gap={4} maxW={"2xl"} as={"main"}>
      <Heading
        as="h1"
        size={{ base: "2xl", sm: "4xl" }}
        wordBreak={"break-word"}
      >
        Privacy, anonymity, freedom, connection.
      </Heading>
      <Text fontSize={{ sm: "lg", md: "xl" }}>
        Browse anonymously, share your thoughts, participate in open dialogue or
        just come and hang out with like-minded people. Join the messaging board
        today.
      </Text>
      <Flex
        w={"full"}
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: 4, md: 0 }}
      >
        <RegisterBtn maxW="fit-content" size="lg">
          Join for free
        </RegisterBtn>
        <Image
          src={catDarkUrl}
          w={{ base: "224px", sm: "320px", md: "384px" }}
          h={{ base: "144px", sm: "206px", md: "247px" }}
          ml="auto"
          mt={{ base: 0, md: -6, xl: 0 }}
          alt="Cartoon cat"
          title="https://www.vecteezy.com/vector-art/4629545-little-cat-pet"
        />
      </Flex>
    </VStack>
  );
}
