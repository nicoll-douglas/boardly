import { useContext } from "react";
import { MainBoardContext } from "../contexts/MainBoardContext";

export default function useMainBoard() {
  return useContext(MainBoardContext);
}
