import { BoardInfo as BoardInfoCommon } from "@/components/common";
import useThread from "../hooks/useThread";

export default function BoardInfo({ variant }) {
  const { data, isLoading } = useThread();

  if (data?.thread.board.deleted) return;

  return (
    <BoardInfoCommon
      data={data?.thread}
      isLoading={isLoading}
      variant={variant}
    />
  );
}
