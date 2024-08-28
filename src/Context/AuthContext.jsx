import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("token") ?? ""
  );
  const [userData, setUserData] = useState(null);

  return (
    <AuthContext.Provider
      value={{ userToken, setUserToken, setUserData, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
