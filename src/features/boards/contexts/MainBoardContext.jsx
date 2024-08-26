import { createContext } from "react";
import useProtectedQuery from "@/lib/hooks/useProtectedQuery";
import mockData from "@root/cypress/fixtures/features/boards/200-response.json";

const MainBoardContext = createContext(null);

function MainBoardProvider({ children }) {
  const { isLoading, protectedData } = useProtectedQuery(
    "/api/boards/main",
    false,
    mockData.body
  );

  return (
    <MainBoardContext.Provider
      value={{ isLoading, board: protectedData?.board }}
    >
      {children}
    </MainBoardContext.Provider>
  );
}

export { MainBoardContext, MainBoardProvider };
