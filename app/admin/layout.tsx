"use client";
import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../firebase/auth";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
      if (!user) {
        router.push("/login");
      }
      console.log(user);
    });
  }, [user, router]);
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
