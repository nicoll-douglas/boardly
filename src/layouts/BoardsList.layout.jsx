import { BoardsList } from "@/features/boards";
import { Outlet } from "react-router-dom";

export default function BoardsListLayout() {
  return (
    <>
      <BoardsList />
      <Outlet />
    </>
  );
}
