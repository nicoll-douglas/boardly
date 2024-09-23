import { createContext } from "react";
import { Protected } from "@/components/utility";
import { mockProfileData } from "../data";

const ProfileContext = createContext();

function ProfileProvider({ children, preventEarlyRender, user }) {
  const { isMe, username } = user;

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
