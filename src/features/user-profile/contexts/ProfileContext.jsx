import { createContext } from "react";
import { ProtectedContext } from "@/contexts";
import mockData from "../data/mockData.json";

const ProfileContext = createContext();

function ProfileProvider({ children, username }) {
  return (
    <ProtectedContext
      endpoint={`/api/users/${username}`}
      mockData={mockData}
      Context={ProfileContext}
    >
      {children}
    </ProtectedContext>
  );
}

export { ProfileContext, ProfileProvider };
