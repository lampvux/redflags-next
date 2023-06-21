"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { getCurrentUser } from "../../firebase/auth";
import { addData, setData } from "../../firebase/firestore";
import { useRouter } from "next/navigation";
import uniqid from "uniqid";

export default function CreateGame() {
  const router = useRouter();
  const [name, setName] = React.useState<string | null>(null);
  const [customCards, setCustomCards] = React.useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userId, setUserId] = React.useState("");
  const CreateGameOverlay = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = React.useState(<CreateGameOverlay />);
  const [disabledAdd, setDisabledAdd] = React.useState(false);

  function handleOnChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleOnChangeCustomCards(e: React.ChangeEvent<HTMLInputElement>) {
    setCustomCards(e.target.checked);
  }
  function checkValues() {
    if (!name) {
      return false;
    }
    return true;
  }
  function resetData() {
    setName(null);
  }
  function showError() {
    setName("");
  }

  async function handleAddGame(e: React.MouseEvent) {
    e.preventDefault();
    setDisabledAdd(true);
    if (checkValues() === false) {
      showError();
      return;
    }
    try {
      const response = await addData("games", {
        name,
        lastActive: Date.now(),
        userId,
        members: [userId],
        customCards: customCards,
        admin: userId,
      });
      if (response.id) {
        try {
          await setData("games", response.id, {
            password: uniqid(),
          });
          onClose();
          router.push(`/games/${response.id}`);
        } catch (error) {
          console.log("error in set unique data: ", error);
        }
      }
    } catch (error) {
      console.log(error);
    }
    resetData();
    setDisabledAdd(false);
  }

  // get current user id from firebase auth
  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) {
        return;
      }
      setUserId(user.uid);
    });
  }, [userId]);

  return (
    <>
      <Button
        flex={1}
        fontSize={"sm"}
        rounded={"full"}
        _focus={{
          bg: "gray.200",
        }}
        onClick={() => {
          setOverlay(<CreateGameOverlay />);
          onOpen();
        }}
      >
        New Game
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Create New Game</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" isInvalid={!name && name !== null}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                maxLength={100}
                value={name === null ? "" : name}
                onChange={handleOnChangeName}
                required
              />
              {!name && name !== null ? (
                <FormHelperText>Enter Game Name</FormHelperText>
              ) : (
                <FormErrorMessage>Please fill out this field.</FormErrorMessage>
              )}
            </FormControl>
            <Box h={4} />

            <FormControl display="flex" alignItems="center" mt={4}>
              <Checkbox
                defaultChecked={customCards}
                onChange={handleOnChangeCustomCards}
              >
                Enable Custom Cards
              </Checkbox>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            <Spacer />
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={handleAddGame}
              disabled={disabledAdd}
            >
              Add Game
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
