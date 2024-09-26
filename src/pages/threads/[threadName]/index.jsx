import { Flex, Card } from "@chakra-ui/react";
import {
  ThreadProvider,
  Thread as ThreadData,
  BoardInfo,
} from "@/features/threads";
import { useParams } from "react-router-dom";

export default function Thread() {
  const { threadId } = useParams();

  return (
    <>
      <ThreadProvider threadId={threadId}>
        <Flex
          flexDir={"column"}
          gap={4}
          flex={1}
          as={Card}
          variant={"unstyled"}
        >
          <BoardInfo variant="base" />
          <ThreadData />
        </Flex>
        <BoardInfo variant="xl" />
      </ThreadProvider>
    </>
  );
}
