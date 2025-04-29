import { BoardsListProvider } from "../contexts/BoardsListContext";
import BoardsList from "./BoardsList";

export default function BoardsListWithProvider() {
  return (
    <BoardsListProvider>
      <BoardsList />
    </BoardsListProvider>
  );
}
