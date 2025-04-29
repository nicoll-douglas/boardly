import { useContext } from "react";
import { FeedContext } from "../contexts/FeedContext";

export default function useFeed() {
  return useContext(FeedContext);
}
