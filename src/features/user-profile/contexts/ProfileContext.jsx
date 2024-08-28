import useProtectedQuery from "@/lib/hooks/useProtectedQuery";
import mockData from "@root/cypress/fixtures/features/user-profile/200-response.json";
import { createContext, useMemo } from "react";
import { Outlet } from "react-router-dom";

const ProfileContext = createContext(null);

function ProfileProvider() {
  const { isLoading, data } = useProtectedQuery("/api/me", mockData.body);

  const contextValue = useMemo(
    () => ({ isLoading, profile: data?.profile }),
    [isLoading, data]
  );

  return (
    <ProfileContext.Provider value={contextValue}>
      <Outlet />
    </ProfileContext.Provider>
  );
}

export { ProfileContext, ProfileProvider };
