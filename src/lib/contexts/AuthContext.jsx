import { createContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState("");

  const contextValue = useMemo(
    () => ({ accessToken, setAccessToken }),
    [accessToken]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
