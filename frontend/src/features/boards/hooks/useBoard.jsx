import { useContext } from "react";
import { BoardContext } from "../contexts/BoardContext";

export default function useBoard() {
  return useContext(BoardContext);
}
