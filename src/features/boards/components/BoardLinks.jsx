import { VStack } from "@chakra-ui/react";
import BoardLink from "./BoardLink";
import NothingToShow from "./NothingToShow";
import boardUrl from "@/assets/images/board.svg";
import alienUrl from "@/assets/images/alien.svg";

export default function BoardLinks({ filteredList, dataList }) {
  if (dataList.length === 0)
    return (
      <NothingToShow
        imageSrc={boardUrl}
        heading="Nothing to show"
        text="Be the first to create a board!"
      />
    );

  return (
    <>
      {filteredList.length === 0 ? (
        <NothingToShow
          imageSrc={alienUrl}
          heading={"Could not find this board"}
          text={"Try something else"}
        />
      ) : (
        <VStack gap={1}>
          {filteredList.map((board) => (
            <BoardLink key={board._id} board={board} />
          ))}
        </VStack>
      )}
    </>
  );
}
