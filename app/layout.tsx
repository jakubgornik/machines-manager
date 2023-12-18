import "../app/styles/globals.css";
import type { Metadata } from "next";
import SessionProvider from "./SessionProvider";
import { Barlow } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

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
      <body className={barlow.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
