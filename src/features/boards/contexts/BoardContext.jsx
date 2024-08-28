import { createContext, useMemo } from "react";
import useProtectedQuery from "@/lib/hooks/useProtectedQuery";
import mockData from "@root/cypress/fixtures/features/boards/200-response.json";

const BoardContext = createContext(null);

function BoardProvider({ boardName, children }) {
  const { isLoading, data, notFound } = useProtectedQuery(
    `/api/boards/${boardName}`,
    mockData.body
  );

  const contextValue = useMemo(
    () => ({ isLoading, board: data?.board, notFound }),
    [isLoading, data, notFound]
  );

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
}

export { BoardContext, BoardProvider };
