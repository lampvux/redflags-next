"use client";
import React, { useEffect, useState } from "react";
import { getDocuments } from "../firebase/firestore";
import Addcard from "./components/Addcard";
import Flags, { Flag } from "./components/Flags";
import { flagType } from "../types";
import { Box, Flex } from "@chakra-ui/react";
import Nav from "./components/Nav";

const transformFlags = (data: any[], type: string): Flag[] => {
  return data.map((flag) => ({
    id: flag.id,
    description: flag.data.cardDescription,
    hint: flag.data.cardHint,
    type: type === flagType.redFlags ? flagType.redFlags : flagType.whiteFlags,
  }));
};

function Page() {
  const [reds, setReds] = useState<any[]>([]);
  const [whites, setWhites] = useState<any[]>([]);

  useEffect(() => {
    getDocuments(flagType.redFlags).then((res) => {
      console.log("res", res);
      setReds(transformFlags(res, flagType.redFlags));
    });
  }, [reds.length]);
  useEffect(() => {
    getDocuments(flagType.whiteFlags).then((res) => {
      console.log("res", res);
      setWhites(transformFlags(res, flagType.whiteFlags));
    });
  }, [whites.length]);

  return (
    <Flex position={"relative"} width={"100%"} direction="column">
      <Nav />
      <Flex p={"20px"} direction="column">
        <Addcard />
        <Box height={"20px"} />
        <hr />
        <Flags flags={reds} />
        <Flags flags={whites} />
      </Flex>
    </Flex>
  );
}

export default Page;
