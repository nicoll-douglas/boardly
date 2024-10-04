import useBoard from "../hooks/useBoard";
import { BoardInfo as BoardInfoCommon } from "@/components/common";

export default function BoardInfo({ variant }) {
  const { data, isLoading } = useBoard();

  return (
    <BoardInfoCommon variant={variant} data={data} isLoading={isLoading} />
  );
}
