import { Flex, Card } from "@chakra-ui/react";
import { BoardProvider, BoardFeed, BoardInfo } from "@/features/boards";
import { useParams } from "react-router-dom";

export default function Board() {
  const { boardName } = useParams();

  return (
    <BoardProvider boardName={boardName}>
      <Flex flexDir={"column"} gap={4} flex={1} as={Card} variant={"unstyled"}>
        <BoardInfo variant="base" />
        <BoardFeed />
      </Flex>
      <BoardInfo variant="xl" />
    </BoardProvider>
  );
}
