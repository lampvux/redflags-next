/**
 * This is a dynamic page that will be rendered at /games/[id]
 * it will be rendered for each game that is created
 * each game will have a unique id
 * each game will have a password to join in
 * each game will have a list of members
 * each game will have a list of cards
 * each game will have a list of rounds
 * any members reach the max score of 3 will be the winner
 */
"use client";
import { Flex } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { getCurrentUser } from "../../firebase/auth";
import { getDoument, watchDocument } from "../../firebase/firestore";
import EnterPasswordPopup from "../components/EnterPasswordPopup";
import ShowPasswordPopup from "../components/ShowPasswordPopup";
import PasswordPopup from "../components/ShowPasswordPopup";

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
        // need to check watcher document
        watchDocument("games", id as unknown as string, (response) => {
          console.log("response", response);
          setCurrentGame(response);
        });
      } else {
        router.push("/games");
      }
    });
  }, []);

  return (
    <Flex>
      {currentGame &&
      currentGame.members.indexOf(userId) !== -1 &&
      currentGame.members.length > 1 ? (
        <Flex></Flex>
      ) : currentGame?.admin === userId ? (
        <ShowPasswordPopup open={true} password={currentGame.password} />
      ) : (
        <EnterPasswordPopup open={true} />
      )}
    </Flex>
  );
}
