"use client";
import React, { useEffect, useState } from "react";
import { getDocuments } from "../firebase/firestore";
import { useRouter } from "next/navigation";
import Addcard from "./components/Addcard";
import Flags from "./components/Flags";
import { flagType } from "../types";
import { useAuthContext } from "../context/AuthContext";
import { Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";

async function Page() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [reds, setReds] = useState<any[]>([]);
  const [whites, setWhites] = useState<any[]>([]);

  useEffect(() => {
    console.log("loading, user", [loading, user]);
    if (loading && !user) {
      router.push("/login");
    } else {
      console.log("user", user);
    }
    getDocuments(flagType.redFlags).then((res) => {
      setReds(res);
    });

    getDocuments(flagType.whiteFlags).then((res) => {
      setWhites(res);
    });
  }, [reds, whites]);

  return (
    <>
      {
        <Flex w={"100%"} mt={"64"}>
          <Sidebar />
          <Flex direction="column" w="100%">
            <Addcard />
            <br />
            <Flags flags={reds} />
            <br />
            <Flags flags={whites} />
          </Flex>
        </Flex>
      }
    </>
  );
}

export default Page;
