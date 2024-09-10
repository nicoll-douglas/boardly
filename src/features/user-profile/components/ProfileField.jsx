import { Box, Heading, Text } from "@chakra-ui/react";

export default function ProfileField({ title, value }) {
  return (
    <Box>
      <Heading size={"sm"}>{title}</Heading>
      <Text pt={1}>{value}</Text>
    </Box>
  );
}
