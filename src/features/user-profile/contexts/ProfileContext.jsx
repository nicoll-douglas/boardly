import useProtectedQuery from "@/lib/hooks/useProtectedQuery";
import data from "@root/cypress/fixtures/features/user-profile/200-response.json";
import { createContext } from "react";
import dompurify from "dompurify";
import formatISOString from "@/lib/utils/formatISOString";

const ProfileContext = createContext(null);

function ProfileProvider({ children }) {
  const { isLoading, protectedData } = useProtectedQuery(
    "/api/me",
    false,
    data.body
  );

  const profile = {
    ...protectedData?.profile,
    bio: dompurify.sanitize(protectedData?.profile.bio),
    createdAt: formatISOString(protectedData?.profile.createdAt),
  };

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileContext, ProfileProvider };
