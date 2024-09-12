import NoData from "./NoData";
import BoardPreview from "./BoardPreview";
import { Spinner } from "@chakra-ui/react";
import boardUrl from "@/assets/images/board.svg";
import { useContext } from "react";
import { BoardsTabContext } from "../contexts/BoardsTabContext";

export default function BoardsTab() {
  const { data, isLoading } = useContext(BoardsTabContext);

  if (isLoading) return <Spinner my={16} size={"xl"} />;

  return (
    <>
      {data.boards.length === 0 ? (
        <NoData
          text="Any boards you administrate will show up here!"
          imageUrl={boardUrl}
        />
      ) : (
        data.boards.map((board) => (
          <BoardPreview
            key={board._id}
            board={board}
            userPrivilege={data.userPrivilege}
          />
        ))
      )}
    </>
  );
}
