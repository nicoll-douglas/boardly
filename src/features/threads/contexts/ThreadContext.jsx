import { createContext } from "react";
import useProtectedQuery from "@/lib/hooks/useProtectedQuery";
const mockData = require("@root/cypress/fixtures/features/threads/200-response.json");

const ThreadContext = createContext(null);

function ThreadProvider({ threadID, children }) {
  const { isLoading, protectedData } = useProtectedQuery(
    `/api/threads/${threadID}`,
    mockData.body
  );

  return (
    <ThreadContext.Provider
      value={{ isLoading, thread: protectedData?.thread }}
    >
      {children}
    </ThreadContext.Provider>
  );
}

export { ThreadContext, ThreadProvider };
