"use client";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../firebase/auth";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("conponent rebuild");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
      if (user) {
        router.push("/");
      }
      console.log(user);
    });
  }, []);

  return <>{children}</>;
}
