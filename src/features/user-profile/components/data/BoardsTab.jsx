import NoData from "../ui/NoData";
import BoardPreview from "./BoardPreview";
import boardUrl from "@/assets/images/board.svg";
import { useContext } from "react";
import { BoardsTabContext } from "../../contexts/BoardsTabContext";
import { Spinner } from "@/components/common";
import useIsMe from "../../hooks/useIsMe";
import { SlideFade, VStack } from "@chakra-ui/react";
import { useCompactView } from "@/features/ui/compactView";

export default function BoardsTab() {
  const { data, isLoading } = useContext(BoardsTabContext);
  const [isMe] = useIsMe();
  const { compactView } = useCompactView();

  if (isLoading) return <Spinner p={4} />;

  return (
    <SlideFade in={!!data} offsetY={10}>
      <VStack
        gap={compactView ? 1 : 2}
        flex={1}
        as={"ul"}
        listStyleType={"none"}
      >
        {data.boards.length === 0 ? (
          <NoData
            text={
              isMe
                ? "Any boards you administrate will show up here!"
                : "This user doesn't administrate any boards."
            }
            imageUrl={boardUrl}
          />
        ) : (
          data.boards.map((board) => (
            <BoardPreview key={board._id} board={board} />
          ))
        )}
      </VStack>
    </SlideFade>
  );
}
