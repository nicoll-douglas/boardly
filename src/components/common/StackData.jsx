import { Text, Heading, Box } from "@chakra-ui/react";

export default function StackData({ name, value }) {
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
      <Text py={1}>{value}</Text>
    </Box>
  );
}
