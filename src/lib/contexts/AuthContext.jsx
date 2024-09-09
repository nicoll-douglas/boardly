import { createContext, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState("");

  const contextValue = { accessToken, setAccessToken };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
