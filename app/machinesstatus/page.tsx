"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Navigation from "../components/Navigation";
import Dashboard from "../components/Dashboard";
import MachinesStatusPanel from "../content/MachinesStatusPanel";

const MachinesSetStatus = () => {
  const { data: session } = useSession();

  if (session)
    return (
      <div className="flex h-screen w-full flex-col sm:flex-row">
        <Navigation />
        <Dashboard title="manage machines status">
          <MachinesStatusPanel />
        </Dashboard>
      </div>
    );
};

export default MachinesSetStatus;
