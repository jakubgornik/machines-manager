import "../app/styles/globals.css";
import type { Metadata } from "next";
import SessionProvider from "./SessionProvider";

export const metadata: Metadata = {
  title: "Machines manager",
  description: "CRUD website application for managing resources",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
