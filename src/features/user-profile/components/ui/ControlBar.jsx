import { Flex, Button, Spacer } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { CompactViewBtn } from "@/features/ui/compactView";
import useIsMe from "../../hooks/useIsMe";

export default function ControlBar() {
  const [isMe] = useIsMe();

  return (
    <Flex gap={2}>
      {isMe && (
        <>
          <Button
            data-cy="Profile-editable"
            variant={"ghost"}
            size={"sm"}
            leftIcon={<AddIcon />}
          >
            New Thread
          </Button>
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
