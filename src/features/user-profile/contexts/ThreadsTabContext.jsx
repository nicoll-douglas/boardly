import { createContext } from "react";
import { Protected } from "@/components/utility";
import { mockThreadData } from "../data";
import { useParams } from "react-router-dom";

const ThreadsTabContext = createContext();

function ThreadsTabProvider({ children }) {
  const { username } = useParams();

  return (
    <Protected
      endpoint={`/api/users/${username}/threads`}
      mockData={mockThreadData}
      Context={ThreadsTabContext}
      preventEarlyRender={false}
    >
      {children}
    </Protected>
  );
}

export { ThreadsTabContext, ThreadsTabProvider };
