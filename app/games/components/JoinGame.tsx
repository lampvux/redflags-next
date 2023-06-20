"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export default function JoinGame() {
  const JoinGameOverlay = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<JoinGameOverlay />);

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
          <ModalHeader>Join Existed Game</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Custom backdrop filters!</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
