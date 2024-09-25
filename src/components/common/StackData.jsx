import { Text, Heading, Box, Link as ChakraLink } from "@chakra-ui/react";
import { noWrap } from "@/lib/constants";
import { Link } from "react-router-dom";

export default function StackData({ name, value, link }) {
  return (
    <Box>
      <Heading
        h={6}
        display={"flex"}
        alignItems={"center"}
        fontWeight={500}
        size={"sm"}
      >
        {name}
      </Heading>
      {link ? (
        <ChakraLink
          variant={"link"}
          as={Link}
          to={link}
          maxW={"fit-content"}
          py={1}
          {...noWrap}
        >
          {value}
        </ChakraLink>
      ) : (
        <Text py={1}>{value}</Text>
      )}
    </Box>
  );
}
