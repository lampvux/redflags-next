"use client";
import React, { ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, signIn, logOut } from "../firebase/auth";

type Props = {
  children: ReactNode;
};

export const AuthContext = React.createContext<any>(null);

export const useAuthContext = () => React.useContext(AuthContext);

const useFirebaseAuth = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);

  const signInhandler = async () => {
    const result = await signIn();

    setUser(result?.user ?? null);
    setLoading(false);
    if (result?.user) return user;
    return false;
  };
  const logoutHandler = async () => {
    return logOut().then(() => {
      setUser(null);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("changeed user", user);
      setUser(user);
    });

    return () => unsubscribe();
  }, [user]);

  return {
    user,
    loading,
    signInhandler,
    logoutHandler,
  };
};

export const AuthContextProvider = ({ children }: Props) => {
  const auth = useFirebaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
