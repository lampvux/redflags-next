"use client";
import { Flex } from "@chakra-ui/react";
import React from "react";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Flex direction={"column"}>
        <Sidebar />
        <Flex direction={"row"}>{children}</Flex>
      </Flex>
    </>
  );
}
