import NoData from "../ui/NoData";
import BoardPreview from "./BoardPreview";
import boardUrl from "@/assets/images/board.svg";
import { useContext } from "react";
import { BoardsTabContext } from "../../contexts/BoardsTabContext";
import Loader from "../ui/Loader";
import useIsMe from "../../hooks/useIsMe";

export default function BoardsTab() {
  const { data, isLoading } = useContext(BoardsTabContext);
  const [isMe] = useIsMe();

  if (isLoading) return <Loader />;

  return (
    <>
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
    </>
  );
}
