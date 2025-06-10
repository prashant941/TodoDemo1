import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { profile } = useAuth();
  const [isLodin, setIsLoding] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await profile();
    })();
  }, []);
  return (
    <>
      <AuthContext.Provider>{children}</AuthContext.Provider>
    </>
  );
};
