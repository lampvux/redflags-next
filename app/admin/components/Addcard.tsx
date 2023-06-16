import React, { useState } from "react";
import {
  Select,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Stack,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { addData } from "../../firebase/firestore";
import { flagType } from "../../types";

export default function Addcard() {
  const [cardType, setCardType] = useState("1");
  const [cardDescription, setCardDescription] = useState("");
  const [cardHint, setCardHint] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function onchangeCardType(e: React.ChangeEvent<HTMLSelectElement>) {
    setCardType(e.target.value);
  }
  function onchangeCardDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setCardDescription(e.target.value);
  }
  function onchangeCardHint(e: React.ChangeEvent<HTMLInputElement>) {
    setCardHint(e.target.value);
  }

  async function handleAddCard(e: React.MouseEvent) {
    e.preventDefault();
    setButtonDisabled(true);
    console.log("cardType", cardType);
    console.log("cardDescription", cardDescription);
    console.log("cardHint", cardHint);
    try {
      await addData(
        cardType === "1" ? flagType.redFlags : flagType.whiteFlags,
        {
          cardDescription,
          cardHint,
        }
      );
    } catch (error) {
      console.log("error when adding card", error);
    }

    setButtonDisabled(false);
    setCardType("");
    setCardDescription("");
    setCardHint("");
  }

  return (
    <form className="w-full max-w-lg">
      <FormControl isInvalid={!cardType}>
        <FormLabel>Card Description</FormLabel>
        <Select
          placeholder="Select option"
          id="card-type"
          required={true}
          value={cardType}
          onChange={onchangeCardType}
        >
          <option value={1}>Red flag</option>
          <option value={0}>White flag</option>
        </Select>
        {!cardType ? (
          <FormHelperText>
            Enter the email you'd like to receive the newsletter on.
          </FormHelperText>
        ) : (
          <FormErrorMessage>Please fill out this field.</FormErrorMessage>
        )}
      </FormControl>
      <Spacer />
      <FormControl isInvalid={!cardDescription}>
        <FormLabel>Card Description</FormLabel>
        <Input
          type="text"
          required={true}
          value={cardDescription}
          onChange={onchangeCardDescription}
          id="card-description"
        />
        {cardDescription ? (
          <FormHelperText>
            Enter the email you'd like to receive the newsletter on.
          </FormHelperText>
        ) : (
          <FormErrorMessage>Please fill out this field.</FormErrorMessage>
        )}
      </FormControl>
      <Spacer />
      <FormControl>
        <FormLabel> Card hint</FormLabel>

        <Input
          value={cardHint}
          onChange={onchangeCardHint}
          id="card-hint"
          type="text"
          placeholder=""
        />
        <FormHelperText>
          Card hint will be displayed on the card for specific use cases &
          guidelines.
        </FormHelperText>
      </FormControl>
      <Spacer />
      <Stack direction="row" spacing={4}>
        <Button
          isLoading={buttonDisabled}
          disabled={buttonDisabled}
          loadingText="Submitting"
          colorScheme="teal"
          variant="outline"
          onClick={handleAddCard}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
}
