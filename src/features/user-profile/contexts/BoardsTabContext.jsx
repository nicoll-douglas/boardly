import { createContext } from "react";
import { Protected } from "@/components/utility";
import { mockBoardData } from "../data";
import { useParams } from "react-router-dom";

const BoardsTabContext = createContext();

function BoardsTabProvider({ children }) {
  const { username } = useParams();

  return (
    <Protected
      endpoint={`/api/users/${username}/replies`}
      mockData={mockBoardData}
      Context={BoardsTabContext}
      preventEarlyRender={false}
    >
      {children}
    </Protected>
  );
}

export { BoardsTabContext, BoardsTabProvider };
