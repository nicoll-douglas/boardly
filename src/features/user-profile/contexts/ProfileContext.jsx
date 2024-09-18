import { createContext } from "react";
import { Protected } from "@/components/utility";
import { mockProfileData } from "../data";
import { useParams } from "react-router-dom";

const ProfileContext = createContext();

function ProfileProvider({ children, preventEarlyRender }) {
  const { username } = useParams();

  return (
    <Protected
      endpoint={`/api/users/${username}`}
      mockData={mockProfileData}
      Context={ProfileContext}
      preventEarlyRender={preventEarlyRender}
    >
      {children}
    </Protected>
  );
}

export { ProfileContext, ProfileProvider };
