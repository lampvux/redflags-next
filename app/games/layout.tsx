"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { getCurrentUser } from "../firebase/auth";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("conponent rebuild");
  const router = useRouter();
  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) {
        router.push("/");
      }
      console.log(user);
    });
  }, []);

  return <>{children}</>;
}
