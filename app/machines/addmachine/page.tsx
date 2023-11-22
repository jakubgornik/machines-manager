"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navigation from "@/app/components/Navigation";
import Dashboard from "@/app/components/Dashboard";
import ManageMachines from "@/app/components/ManageMachines";
import { useCallback } from "react";
import { MachineData } from "@/types";

const AddNewMachinePanel = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const userId = session?.user?.id ? session.user.id : "";

  const addMachine = useCallback(
    async (data: MachineData) => {
      try {
        const res = await fetch(
          `https://machinesv2-default-rtdb.europe-west1.firebasedatabase.app/${userId}/machines.json`,
        );
        const fetchedData = await res.json();
        const updatedData = [...(fetchedData || []), data];

        await fetch(
          `https://machinesv2-default-rtdb.europe-west1.firebasedatabase.app/${userId}/machines.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          },
        );

        router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
    [userId, router],
  );

  if (session)
    return (
      <div className="flex h-[100dvh] flex-col sm:flex-row">
        <Navigation />
        <Dashboard title="add machine">
          <ManageMachines onAdd={addMachine} userId={userId} />
        </Dashboard>
      </div>
    );
};

export default AddNewMachinePanel;
