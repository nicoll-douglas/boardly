import { useContext } from "react";
import { BoardsListContext } from "../contexts/BoardsListContext";

export default function useBoardsList() {
  return useContext(BoardsListContext);
}
