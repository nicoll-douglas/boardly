import { Flex, Divider, Heading, Box } from "@chakra-ui/react";

export default function DataBar({ name, value, dividerTop, dividerBottom }) {
  return (
    <>
      {dividerTop && <Divider />}
      <Flex justifyContent={"space-between"} my={1} gap={4}>
        <Heading size={"sm"} color={"gray.300"}>
          {name}
        </Heading>
        <Box textAlign={"right"}>{value}</Box>
      </Flex>
      {dividerBottom && <Divider />}
    </>
  );
}
