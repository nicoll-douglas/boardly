import { Flex, Heading, Center } from "@chakra-ui/react";

export default function NothingToShow({
  heading = "Nothing to show",
  children,
  imageUrl,
  ...rest
}) {
  return (
    <Center
      flexDir={{ base: "column", lg: "row" }}
      gap={{ base: 0, lg: 8 }}
      mt={{ base: 8, lg: 0 }}
      textAlign={{ base: "center", lg: "left" }}
      {...rest}
    >
      <Flex flexDir={"column"} gap={2}>
        <Heading size={"xl"}>{heading}</Heading>
        {children}
      </Flex>
      <img src={imageUrl} width={250} height={250} />
    </Center>
  );
}
