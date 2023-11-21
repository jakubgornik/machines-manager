"use client";

import React from "react";
import { useGetUserId } from "../../hooks/useGetUserId";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navigation from "@/app/components/Navigation";
import Dashboard from "@/app/components/Dashboard";
import ManageMachines from "@/app/components/ManageMachines";
import { useCallback } from "react";

const AddNewMachinePanel = () => {
  const { data: session } = useSession();
  const userId = useGetUserId();
  const router = useRouter();

  const addMachine = useCallback(
    async (data: machineData) => {
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
      <div className="flex h-screen  flex-col sm:flex-row">
        <Navigation />
        <Dashboard title="add machine">
          <ManageMachines onAdd={addMachine} userId={userId} />
        </Dashboard>
      </div>
    );
};

export default AddNewMachinePanel;
