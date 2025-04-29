import {
  Text,
  Heading,
  Box,
  // Link as ChakraLink,
} from "@chakra-ui/react";
import ButtonLink from "./ButtonLink";

export default function StackData({ name, value, link, ...rest }) {
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
        <ButtonLink to={link}>{value}</ButtonLink>
      ) : (
        <Text py={1} whiteSpace={"pre-wrap"} {...rest}>
          {value}
        </Text>
      )}
    </Box>
  );
}
