import { createContext } from "react";
import { Protected } from "@/components/utility";
import { mockThreadData } from "../data";
import useIsMe from "../hooks/useIsMe";

const ThreadsTabContext = createContext();

function ThreadsTabProvider({ children }) {
  const [isMe, username] = useIsMe();

  return (
    <Protected
      endpoint={isMe ? "/api/me/threads" : `/api/users/${username}/threads`}
      mockData={mockThreadData}
      Context={ThreadsTabContext}
    >
      {children}
    </Protected>
  );
}

export { ThreadsTabContext, ThreadsTabProvider };
