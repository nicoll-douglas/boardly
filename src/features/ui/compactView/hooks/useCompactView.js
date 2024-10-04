import { useContext } from "react";
import { CompactViewContext } from "../contexts/CompactViewContext";

export default function useCompactView() {
  return useContext(CompactViewContext);
}
