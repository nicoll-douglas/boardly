import { Text, Button, Link } from "@chakra-ui/react";

export default function Authorship() {
  return (
    <Text display={"flex"} gap={1} as={"footer"}>
      {"A project by"}
      <Button
        as={Link}
        href="https://github.com/nicoll-douglas"
        target="_blank"
        variant={"link"}
      >
        Nicoll Douglas
      </Button>
    </Text>
  );
}
