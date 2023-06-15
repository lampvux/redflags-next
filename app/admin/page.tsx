"use client";
import React, { useEffect, useState } from "react";
import { getDocuments } from "../firebase/firestore";
import Addcard from "./components/Addcard";
import Flags from "./components/Flags";
import { flagType } from "../types";
import { Flex } from "@chakra-ui/react";
import Nav from "./components/Nav";

async function Page() {
  const [reds, setReds] = useState<any[]>([]);
  const [whites, setWhites] = useState<any[]>([]);

  useEffect(() => {
    getDocuments(flagType.redFlags).then((res) => {
      setReds(res);
    });

    getDocuments(flagType.whiteFlags).then((res) => {
      setWhites(res);
    });
  }, [reds, whites]);

  return (
    <Flex position={"relative"} width={"100%"} direction="column">
      <Nav />
      <Flex p={4}>
        <Addcard />
        <br />
        <Flags flags={reds} />
        <br />
        <Flags flags={whites} />
      </Flex>
    </Flex>
  );
}

export default Page;
