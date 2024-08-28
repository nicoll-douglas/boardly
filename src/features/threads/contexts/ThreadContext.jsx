import { createContext, useMemo } from "react";
import useProtectedQuery from "@/lib/hooks/useProtectedQuery";
import mockData from "@root/cypress/fixtures/features/threads/200-response.json";

const ThreadContext = createContext(null);

function ThreadProvider({ threadID, children }) {
  const { isLoading, data, notFound } = useProtectedQuery(
    `/api/threads/${threadID}`,
    mockData.body
  );

  const contextValue = useMemo(
    () => ({ isLoading, thread: data?.thread, notFound }),
    [isLoading, data, notFound]
  );

  return (
    <ThreadContext.Provider value={contextValue}>
      {children}
    </ThreadContext.Provider>
  );
}

export { ThreadContext, ThreadProvider };
