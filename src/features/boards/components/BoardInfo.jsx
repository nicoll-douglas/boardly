import useBoard from "../hooks/useBoard";
import { BoardInfo as BoardInfoCommon } from "@/components/common";

export default function BoardInfo({ variant }) {
  const { data } = useBoard();

  return <BoardInfoCommon variant={variant} board={data.board} />;
}
