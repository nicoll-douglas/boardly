import { BoardInfo as BoardInfoCommon } from "@/components/common";
import useThread from "../hooks/useThread";

export default function BoardInfo({ variant }) {
  const { data, isLoading } = useThread();

  return (
    <BoardInfoCommon
      data={data?.thread}
      isLoading={isLoading}
      variant={variant}
    />
  );
}
