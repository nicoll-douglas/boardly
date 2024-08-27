import { createContext } from "react";
import useProtectedQuery from "@/lib/hooks/useProtectedQuery";
import mockData from "@root/cypress/fixtures/features/boards/200-response.json";

const BoardContext = createContext(null);

function BoardProvider({ boardID, children }) {
  const { isLoading, protectedData } = useProtectedQuery(
    `/api/boards/${boardID}`,
    mockData.body
  );

  return (
    <BoardContext.Provider value={{ isLoading, board: protectedData?.board }}>
      {children}
    </BoardContext.Provider>
  );
}

export { BoardContext, BoardProvider };
