import React from "react";
import Nav from "./components/Nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Nav />
      {children}
    </main>
  );
}
