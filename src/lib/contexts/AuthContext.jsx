import { createContext, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState("");

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
