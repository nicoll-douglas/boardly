import { Flex, Button, Spacer } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { CompactViewBtn } from "@/features/ui/compactView";

export default function ControlBar() {
  return (
    <Flex gap={4}>
      <Button variant={"ghost"} size={"sm"} leftIcon={<AddIcon />}>
        New Thread
      </Button>
      <Spacer />
      <CompactViewBtn />
    </Flex>
  );
}
