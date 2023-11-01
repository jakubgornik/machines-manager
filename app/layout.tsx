import "../app/styles/globals.css";
import type { Metadata } from "next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import SessionProvider from "./SessionProvider";
import Home from "./page";
import SignIn from "./signin/page";
import { useRouter } from "next/router";

export const metadata: Metadata = {
  title: "Machines manager",
  description: "CRUD website application for managing resources",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
