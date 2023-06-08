"use client";
import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getDocuments } from "../firebase/firestore";
import { useRouter } from "next/navigation";
import { Addcard } from "./components/Addcard";
import Flags from "./components/Flags";
import { redFlags, whiteFlags } from "../constants";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [reds, setReds] = useState([]);
  const [whites, setWhites] = useState([]);

  const getRedFlags = () => {
    return getDocuments(redFlags);
  };
  const getWhiteFlags = () => {
    return getDocuments(whiteFlags);
  };

  React.useEffect(() => {
    if (user === null) router.push("/");

    setReds(getRedFlags());
    setWhites(getWhiteFlags());
  }, [router, user, reds, whites]);

  return (
    <div>
      <Addcard />
      <Flags flags={reds} />
      <Flags flags={whites} />
    </div>
  );
}

export default Page;
