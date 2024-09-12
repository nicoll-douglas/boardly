import { createContext } from "react";
import { Protected } from "@/components/utility";
import { mockProfileData } from "../data";
import { useParams } from "react-router-dom";

const ProfileContext = createContext();

function ProfileProvider({ children }) {
  const { username } = useParams();

  return (
    <Protected
      endpoint={`/api/users/${username}`}
      mockData={mockProfileData}
      Context={ProfileContext}
    >
      {children}
    </Protected>
  );
}

export { ProfileContext, ProfileProvider };
