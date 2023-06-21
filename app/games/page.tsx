/* eslint-disable react/react-in-jsx-scope */
"use client";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";

export default function Games() {
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={"/img/card-game.png"}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          Red Flag Game
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          @theredflaggame
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          You can create join game
        </Text>

        <Stack mt={8} direction={"row"} spacing={4}>
          <CreateGame />
          <JoinGame />
        </Stack>
      </Box>
    </Center>
  );
}
