"use client";
import React from "react";
import Navigation from "../components/Navigation";
import Dashboard from "../components/Dashboard";
import MailsBoardPanel from "../content/MailsBoardPanel";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MailPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.replace("/");
  }

  if (session)
    return (
      <div className="flex h-screen w-full flex-col sm:flex-row">
        <Navigation />
        <Dashboard title="Mailbox">
          <MailsBoardPanel />
        </Dashboard>
      </div>
    );
};

export default MailPage;
