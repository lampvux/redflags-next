"use client";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect } from "react";
import { useAuthContext } from "./context/AuthContext";
import { auth } from "./firebase/auth";

export default async function IndexPage() {
  const { signInhandler, logoutHandler } = useAuthContext();
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user change", user);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center justify-center">
        {user === null ? (
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={signInhandler}
            >
              login
            </button>
          </div>
        ) : (
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={logoutHandler}
            >
              logout
            </button>{" "}
            <div className="text-2xl">Welcome {user?.displayName}</div>
          </div>
        )}
      </div>
    </main>
  );
}
