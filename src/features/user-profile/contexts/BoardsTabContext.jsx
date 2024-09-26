import { createContext } from "react";
import { Protected } from "@/components/utility";
import { mockBoardData } from "../data";
import useIsMe from "../hooks/useIsMe";

const BoardsTabContext = createContext();

function BoardsTabProvider({ children }) {
  const [isMe, username] = useIsMe();

  return (
    <Protected
      endpoint={isMe ? "/api/me/boards" : `/api/users/${username}/boards`}
      mockData={mockBoardData}
      Context={BoardsTabContext}
    >
      {children}
    </Protected>
  );
}

export { BoardsTabContext, BoardsTabProvider };
