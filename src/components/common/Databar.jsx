import { Flex, Divider, Heading, Box } from "@chakra-ui/react";
import noWrap from "@/lib/constants/noWrap";

export default function DataBar({ name, value, dividerTop, dividerBottom }) {
  return (
    <>
      {dividerTop && <Divider />}
      <Flex justifyContent={"space-between"} my={1} gap={8}>
        <Heading size={"sm"} color={"gray.300"}>
          {name}
        </Heading>
        <Box textAlign={"right"} fontSize={"sm"} {...noWrap}>
          {value}
        </Box>
      </Flex>
      {dividerBottom && <Divider />}
    </>
  );
}
