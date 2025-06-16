import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useOrganizastion from "../hooks/useOrganizastion";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { profile } = useAuth();
  const { getMyOrganizastion } = useOrganizastion();
  const [loading, setLoading] = useState(true);

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

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
