import "./globals.css";
import { Inter } from "next/font/google";
import { dir } from "i18next";
import { AuthContextProvider } from "../context/AuthContext";
import { languages } from "../i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
