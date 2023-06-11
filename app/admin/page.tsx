"use client";
import React, { useEffect, useState } from "react";
import { getDocuments } from "../firebase/firestore";
import { useRouter } from "next/navigation";
import Addcard from "./components/Addcard";
import Flags from "./components/Flags";
import { flagType } from "../types";
import { useAuthContext } from "../context/AuthContext";

async function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [reds, setReds] = useState<any[]>([]);
  const [whites, setWhites] = useState<any[]>([]);

  useEffect(() => {
    const red = getDocuments(flagType.redFlags).then((res) => {
      setReds(res);
    });

    const white = getDocuments(flagType.whiteFlags).then((res) => {
      setWhites(res);
    });
  }, [reds, whites]);

  return (
    <main className="container flex flex-col p-4">
      <Addcard />
      <br />
      <Flags flags={reds} />
      <br />
      <Flags flags={whites} />
    </main>
  );
}

export default Page;
