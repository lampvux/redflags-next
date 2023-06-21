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

interface PasswordPopupProps {
  open: boolean;
}

export default function PasswordPopup({ open }: PasswordPopupProps) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: open });
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  function copyPasswordHandle() {
    navigator.clipboard.writeText("123456");
  }

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Custom backdrop filters!</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={copyPasswordHandle}>Copy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
