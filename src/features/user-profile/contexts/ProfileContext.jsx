import useProtectedQuery from "@/lib/hooks/useProtectedQuery";
import data from "@root/cypress/fixtures/features/user-profile/200-response.json";
import { createContext } from "react";

const ProfileContext = createContext(null);

function ProfileProvider({ children }) {
  const { isLoading, protectedData } = useProtectedQuery("/api/me", true);

  return (
    <ProfileContext.Provider value={{ isLoading, protectedData }}>
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileContext, ProfileProvider };
