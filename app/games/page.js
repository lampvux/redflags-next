"use client";
import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

function Games() {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [router, user]);

  return <h1>Only logged in users can view this Games</h1>;
}

export default Games;
