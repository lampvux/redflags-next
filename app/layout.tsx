import React from "react";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <AuthContextProvider>{children}</AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
