"use client";
import { Flex } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import React, { use } from "react";
import { useEffect } from "react";
import { getCurrentUser } from "../../firebase/auth";
import { getDoument, watchDocument } from "../../firebase/firestore";
import PasswordPopup from "../components/PasswordPopup";

export default function Singlegame() {
  const [currentGame, setCurrentGame] = React.useState<any>(null);
  const [userId, setUserId] = React.useState("");
  // get current url params in nextjs
  const router = useRouter();
  const { id } = useParams();

  // get current user id from firebase auth
  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) {
        return;
      }
      setUserId(user.uid);
    });
  }, [userId]);

  useEffect(() => {
    console.log("id: ", id);
    getDoument("games", id as unknown as string).then((res) => {
      console.log("res", res);
      if (!res.error) {
        watchDocument("games", id as unknown as string, (res) => {
          console.log("res", res);
          setCurrentGame(res);
        });
      } else {
        router.push("/games");
      }
    });
  }, []);

  return (
    <Flex>
      {currentGame && currentGame.members.indexOf(userId) !== -1 ? (
        <Flex>Game</Flex>
      ) : (
        <Flex>
          <PasswordPopup open={true} />{" "}
        </Flex>
      )}
    </Flex>
  );
}
