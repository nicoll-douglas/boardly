import { createContext } from "react";
import { Protected } from "@/components/utility";
import { mockProfileData } from "../data";
import useIsMe from "../hooks/useIsMe";

const ProfileContext = createContext();

function ProfileProvider({ children, preventEarlyRender }) {
  const [isMe, username] = useIsMe();

  return (
    <Protected
      endpoint={isMe ? "/api/me" : `/api/users/${username}`}
      mockData={mockProfileData}
      Context={ProfileContext}
      preventEarlyRender={preventEarlyRender}
    >
      {children}
    </Protected>
  );
}

export { ProfileContext, ProfileProvider };
