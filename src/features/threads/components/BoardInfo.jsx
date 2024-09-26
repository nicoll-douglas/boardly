import { BoardInfo as BoardInfoCommon } from "@/components/common";
import useThread from "../hooks/useThread";

export default function BoardInfo({ variant }) {
  const { data } = useThread();

  return <BoardInfoCommon board={data.thread.board} variant={variant} />;
}
