import { createContext } from "react";
import { Protected } from "@/components/utility";
import threadData from "../data/mockThreadData";

const ThreadContext = createContext();

function ThreadProvider({ children, threadId }) {
  return (
    <Protected
      endpoint={`/api/threads/${threadId}`}
      Context={ThreadContext}
      preventEarlyRender={true}
      mockData={threadData}
    >
      {children}
    </Protected>
  );
}

export { ThreadContext, ThreadProvider };
