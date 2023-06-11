import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
