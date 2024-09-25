import { createContext } from "react";
import { Protected } from "@/components/utility";
import threadData from "../data/mockThreadData";

const ThreadContext = createContext();

function ThreadProvider({ children, threadName }) {
  return (
    <Protected
      endpoint={`/api/threads/${threadName}`}
      Context={ThreadContext}
      preventEarlyRender={false}
      mockData={threadData}
    >
      {children}
    </Protected>
  );
}

export { ThreadContext, ThreadProvider };
