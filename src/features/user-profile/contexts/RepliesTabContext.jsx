import { createContext } from "react";
import { Protected } from "@/components/utility";
import { mockReplyData } from "../data";
import useIsMe from "../hooks/useIsMe";

const RepliesTabContext = createContext();

function RepliesTabProvider({ children }) {
  const [isMe, username] = useIsMe();

  return (
    <Protected
      endpoint={isMe ? "/api/me/replies" : `/api/users/${username}/replies`}
      mockData={mockReplyData}
      Context={RepliesTabContext}
      preventEarlyRender={false}
    >
      {children}
    </Protected>
  );
}

export { RepliesTabContext, RepliesTabProvider };
