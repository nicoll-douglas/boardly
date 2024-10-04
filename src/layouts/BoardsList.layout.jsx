import { BoardsList, BoardsListProvider } from "@/features/boards";
import { Outlet } from "react-router-dom";

export default function BoardsListLayout() {
  return (
    <>
      <BoardsListProvider>
        <BoardsList />
        <Outlet />
      </BoardsListProvider>
    </>
  );
}
