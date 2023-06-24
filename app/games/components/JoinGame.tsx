"use client";

import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import {
  findDocument,
  updateDocumentArrayField,
} from "../../firebase/firestore";
import { games } from "../../types";
import { useRouter } from "next/navigation";

export default function JoinGame({ userId }: { userId: string }) {
  const JoinGameOverlay = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<JoinGameOverlay />);
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  function passwordChangeHandle(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function enterGameHandle() {
    try {
      findDocument(games, "password", password).then(async (doc) => {
        if (doc) {
          console.log(doc);
          await updateDocumentArrayField(games, doc.id, "members", userId);
          onClose();
          router.push(`/games/${doc.id}`);
        } else {
          console.log("No such document!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Button
        flex={1}
        fontSize={"sm"}
        rounded={"full"}
        bg={"blue.400"}
        color={"white"}
        boxShadow={
          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
        }
        _hover={{
          bg: "blue.500",
        }}
        _focus={{
          bg: "blue.500",
        }}
        onClick={() => {
          setOverlay(<JoinGameOverlay />);
          onOpen();
        }}
      >
        Join Game
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Enter password to join game</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={passwordChangeHandle}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={enterGameHandle}>Enter</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
