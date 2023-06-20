"use client";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { getCurrentUser } from "../firebase/auth";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) {
        router.push("/login");
      }
      console.log(user);
    });
  }, []);
  return (
    <>
      <Sidebar />
      <Flex
        direction={"row"}
        maxW={{ base: "100%", md: "calc(100vw - 240px)" }}
        marginLeft={{ base: 0, md: "240px" }}
      >
        {children}
      </Flex>
    </>
  );
}
