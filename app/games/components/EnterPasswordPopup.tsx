// password popup component

"use client";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { findDocument, getDocuments } from "../../firebase/firestore";

interface PasswordPopupProps {
  open: boolean;
}

export default function EnterPasswordPopup({ open }: PasswordPopupProps) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: open });
  const [overlay] = React.useState(<OverlayOne />);
  const [password, setPassword] = React.useState("");

  function passwordChangeHandle(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function enterGameHandle() {
    try {
      findDocument("games", "password", password).then((doc) => {
        if (doc) {
          console.log(doc);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
