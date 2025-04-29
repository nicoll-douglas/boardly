import { Flex, Heading } from "@chakra-ui/react";
import { CompactViewBtn } from "@/features/ui/compactView";
import useIsMe from "../../hooks/useIsMe";
import { NewThreadBtn } from "@/features/threads";
import { NewBoardBtn } from "@/features/boards";

export default function ControlBar() {
  const [isMe] = useIsMe();

  return (
    <Flex
      gap={2}
      alignItems={"center"}
      flexWrap={"wrap"}
      justifyContent={"space-between"}
    >
      <Heading size={"md"}>Activity</Heading>
      <Flex gap={2} alignItems={"center"}>
        {isMe && (
          <>
            <NewThreadBtn />
            <NewBoardBtn />
          </>
        )}
        <CompactViewBtn />
      </Flex>
    </Flex>
  );
}
