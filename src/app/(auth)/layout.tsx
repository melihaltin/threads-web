import { ClerkProvider } from "@clerk/nextjs";
import { Lexend } from "next/font/google";
import React from "react";
import "../globals.css";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "Threads",
  description: "Threads",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html>
        <body className={`${lexend.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;
