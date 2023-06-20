"use client";

import {
  Box,
  Button,
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
import React from "react";
import { addData } from "../../firebase/firestore";

export default function CreateGame() {
  const CreateGameOverlay = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [name, setName] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<CreateGameOverlay />);

  function handleOnChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function handleOnchangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function checkValues() {
    if (!name || !password) {
      return false;
    }
    return true;
  }
  function resetData() {
    setName(null);
    setPassword(null);
  }
  function showError() {
    setName("");
    setPassword("");
  }

  async function handleAddGame(e: React.MouseEvent) {
    e.preventDefault();
    if (checkValues() === false) {
      showError();
      return;
    }
    try {
      await addData("games", { name, password });
    } catch (error) {
      console.log(error);
    }
    resetData();
  }

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
            <FormControl
              id="password"
              isInvalid={!password && password !== null}
            >
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password === null ? "" : password}
                onChange={handleOnchangePassword}
                required
              />
              {!password && password !== null ? (
                <FormHelperText>Enter Game Password</FormHelperText>
              ) : (
                <FormErrorMessage>Please fill out this field.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            <Spacer />
            <Button colorScheme="teal" variant="solid" onClick={handleAddGame}>
              Add Game
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
