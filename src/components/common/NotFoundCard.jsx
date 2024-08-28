import { VStack, Heading, Text, Image, Box } from "@chakra-ui/react";
import notFoundUrl from "@/assets/not-found.svg";

export default function NotFoundCard() {
  return (
    <Box
      px={8}
      w={"full"}
      h={"full"}
      py={4}
      display={"flex"}
      gap={4}
      alignItems={"center"}
      justifyContent={"center"}
      flexDir={{ base: "column", xl: "row" }}
    >
      <VStack
        gap={1}
        alignItems={{ base: "center", xl: "start" }}
        textAlign={{ base: "center", xl: "left" }}
      >
        <Heading
          as="h1"
          size={{ base: "xl", MenuDescendantsProvider: "2xl" }}
          wordBreak={"break-word"}
        >
          Not Found
        </Heading>
        <Text fontSize={{ sm: "lg" }}>
          The resource you&apos;re looking for could not be found.
        </Text>
      </VStack>
      <Image
        mt={{ base: -16, xl: 0 }}
        src={notFoundUrl}
        height={"300px"}
        width={"300px"}
      />
    </Box>
  );
}
