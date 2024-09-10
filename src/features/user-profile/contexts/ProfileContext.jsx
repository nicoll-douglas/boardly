import { createContext } from "react";
import ProtectedContext from "@/lib/contexts/ProtectedContext";
import mockProfile from "../data/mockProfile.json";

const ProfileContext = createContext();

function ProfileProvider({ children, username }) {
  return (
    <ProtectedContext
      endpoint={`/api/users/${username}`}
      mockData={mockProfile}
      Context={ProfileContext}
    >
      {children}
    </ProtectedContext>
  );
}

export { ProfileContext, ProfileProvider };
