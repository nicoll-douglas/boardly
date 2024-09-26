import { createContext } from "react";
import { Protected } from "@/components/utility";
import mockBoardData from "../data/mockBoardData";

const BoardContext = createContext();

function BoardProvider({ children, boardName }) {
  return (
    <Protected
      endpoint={`/api/boards/${boardName}`}
      Context={BoardContext}
      mockData={{ ...mockBoardData }}
      preventEarlyRender={true}
    >
      {children}
    </Protected>
  );
}

export { BoardContext, BoardProvider };
