import React, { createContext, useEffect, useState, ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import useOrganizastion from "../hooks/useOrganizastion";

const AuthContext = createContext<null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { profile } = useAuth();
  const { getMyOrganizastion } = useOrganizastion();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      await profile();
      await getMyOrganizastion();
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export default AuthContext;
