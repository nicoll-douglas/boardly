import { createContext } from "react";
import { Protected } from "@/components/utility";
import boardListData from "../data/mockBoardListData";

const BoardsListContext = createContext();

function BoardsListProvider({ children }) {
  return (
    <Protected
      endpoint={"/api/boards"}
      Context={BoardsListContext}
      mockData={boardListData}
    >
      {children}
    </Protected>
  );
}

export { BoardsListContext, BoardsListProvider };
