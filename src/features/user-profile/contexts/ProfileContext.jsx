import { createContext } from "react";
import { Protected } from "@/components/utility";
import mockData from "../data/mockData.json";

const ProfileContext = createContext();

function ProfileProvider({ children, username }) {
  return (
    <Protected
      endpoint={`/api/users/${username}`}
      mockData={mockData}
      Context={ProfileContext}
    >
      {children}
    </Protected>
  );
}

export { ProfileContext, ProfileProvider };
