import { createContext } from "react";
import { Protected } from "@/components/utility";
import mockFeedData from "../data/mockFeedData";

const FeedContext = createContext();

function FeedProvider({ children }) {
  return (
    <Protected
      endpoint={"/api/threads"}
      Context={FeedContext}
      mockData={mockFeedData}
    >
      {children}
    </Protected>
  );
}

export { FeedContext, FeedProvider };
