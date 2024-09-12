import { createContext } from "react";
import { Protected } from "@/components/utility";
import { mockReplyData } from "../data";
import { useParams } from "react-router-dom";

const RepliesTabContext = createContext();

function RepliesTabProvider({ children }) {
  const { username } = useParams();

  return (
    <Protected
      endpoint={`/api/users/${username}/replies`}
      mockData={mockReplyData}
      Context={RepliesTabContext}
      preventEarlyRender={false}
    >
      {children}
    </Protected>
  );
}

export { RepliesTabContext, RepliesTabProvider };
