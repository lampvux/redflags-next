"use client";
import React from "react";
import { signIn } from "../firebase/auth";

export default function Login() {
  const signInhandler = async () => {
    const result = await signIn();
    console.log(result);
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      onClick={signInhandler}
    >
      login
    </button>
  );
}
