import "../app/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Machines manager",
  description: "CRUD website application for managing resources",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
