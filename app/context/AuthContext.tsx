"use client";
import React, { ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, signIn, logOut } from "../firebase/auth";

type Props = {
  children: ReactNode;
};

export const AuthContext = React.createContext<any>(null);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User | null>(null);

  const signInhandler = async () => {
    const result = await signIn();

    setUser(result?.user ?? null);
  };

  const logoutHandler = async () => {
    return logOut();
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [user]);

  const value = {
    user,
    signInhandler,
    logoutHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
