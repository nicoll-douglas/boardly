import { BoardInfo as BoardInfoCommon } from "@/components/common";
import useThread from "../hooks/useThread";

export default function BoardInfo({ variant }) {
  const { data, isLoading } = useThread();

  return (
    <BoardInfoCommon
      board={data.thread.board}
      isLoading={isLoading}
      variant={variant}
    />
  );
}
