import { Box, Heading, Text } from "@chakra-ui/react";

export default function ProfileField({ title, value }) {
  return (
    <Box>
      <Heading
        h={6}
        display={"flex"}
        alignItems={"center"}
        fontWeight={500}
        size={"sm"}
      >
        {title}
      </Heading>
      <Text py={1}>{value}</Text>
    </Box>
  );
}
