"use client";

import { CopyIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

interface PasswordPopupProps {
  open: boolean;
  password: string;
}

export default function ShowPasswordPopup({
  open,
  password,
}: PasswordPopupProps) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: open });
  const [overlay] = React.useState(<OverlayOne />);

  function copyPasswordHandle() {
    navigator.clipboard.writeText(password);
  }

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>
            Here is your game password, send it to your friend by clicking the
            copy button
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <HStack>
                <PinInput defaultValue={password}>
                  {password.length
                    ? password
                        .split("")
                        .map((char, index) => <PinInputField key={index} />)
                    : ""}
                </PinInput>
                <Button onClick={copyPasswordHandle}>
                  <CopyIcon />
                </Button>
              </HStack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={copyPasswordHandle}>Copy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
