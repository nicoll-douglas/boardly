import useProtectedQuery from "@/lib/hooks/useProtectedQuery";
import data from "@root/cypress/fixtures/features/user-profile/200-response.json";
import { createContext, useContext } from "react";

const ProfileContext = createContext(null);

function ProfileProvider({ children }) {
  const { isLoading, protectedData } = useProtectedQuery(
    "/api/me",
    false,
    data.body
  );

  return (
    <ProfileContext.Provider value={{ isLoading, protectedData }}>
      {children}
    </ProfileContext.Provider>
  );
}

function useProfileContext() {
  return useContext(ProfileContext);
}

export { ProfileContext, ProfileProvider, useProfileContext };
