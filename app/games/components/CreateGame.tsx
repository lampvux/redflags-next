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

export default function CreateGame() {
  const CreateGameOverlay = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<CreateGameOverlay />);

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
