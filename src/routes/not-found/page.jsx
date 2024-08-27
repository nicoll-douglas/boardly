import Container from "@/components/common/Container";
import { Center, VStack, Heading, Text, Image, Flex } from "@chakra-ui/react";
import notFoundUrl from "@/assets/not-found.svg";
import Header from "@/components/common/Header";
import Logo from "@/components/common/Logo";

export default function NotFoundPage() {
  return (
    <Container>
      <Header>
        <Logo to={"/"} />
      </Header>
      <Center mt={12} mb={32} flex={1}>
        <Flex
          gap={4}
          alignItems={"center"}
          flexDir={{ base: "column", lg: "row" }}
        >
          <VStack
            gap={3}
            maxW={"2xl"}
            as={"main"}
            alignItems={{ base: "center", lg: "start" }}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Heading
              as="h1"
              size={{ base: "2xl", sm: "4xl" }}
              wordBreak={"break-word"}
            >
              Not Found
            </Heading>
            <Text fontSize={{ sm: "lg" }}>
              The page you&apos;re looking for could not be found.
            </Text>
          </VStack>
          <Image
            src={notFoundUrl}
            w={{ base: "300px", md: "380px" }}
            h={{ base: "300px", md: "380px" }}
            mt={{ base: -12, lg: 0 }}
            alt="graphic displaying dialogue"
          />
        </Flex>
      </Center>
    </Container>
  );
}
