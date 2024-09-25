import { Flex, Button, Spacer } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { CompactViewBtn } from "@/features/ui/compactView";
import useIsMe from "../../hooks/useIsMe";
import { NewThreadBtn } from "@/features/threads";

export default function ControlBar() {
  const [isMe] = useIsMe();

  return (
    <Flex gap={2}>
      {isMe && (
        <>
          <NewThreadBtn />
          <Button variant={"ghost"} size={"sm"} leftIcon={<AddIcon />}>
            New Board
          </Button>
        </>
      )}
      <Spacer />
      <CompactViewBtn />
    </Flex>
  );
}
