"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navigation from "@/app/components/Navigation";
import Dashboard from "@/app/components/Dashboard";
import ManageMachinesStatus from "@/app/components/ManageMachinesStatus";
import { useCallback } from "react";
import { MachineData } from "@/types";

const SetMachineStatusPanel = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const userId = session?.user?.id ? session.user.id : "";

  const updateMachineStatus = useCallback(
    async (
      userId: string,
      machineToUpdateId: string,
      newData: Partial<MachineData>,
    ): Promise<void> => {
      try {
        const res = await fetch(
          `https://machinesv2-default-rtdb.europe-west1.firebasedatabase.app/${userId}/machines.json`,
        );
        const fetchedData = await res.json();

        const machineToUpdate = Object.keys(fetchedData || {}).find(
          (machineId) => fetchedData[machineId]?.id === machineToUpdateId,
        );

        if (!machineToUpdate) {
          throw new Error("Machine not found");
        }

        await fetch(
          `https://machinesv2-default-rtdb.europe-west1.firebasedatabase.app/${userId}/machines/${machineToUpdate}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...fetchedData[machineToUpdate],
              ...newData,
            }),
          },
        );

        router.push("/machinesstatus");
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update machine");
      }
    },
    [router],
  );

  if (session)
    return (
      <div className="flex h-[100dvh] flex-col sm:flex-row">
        <Navigation />
        <Dashboard title="manage status">
          <ManageMachinesStatus
            userId={userId}
            id={params.id}
            onUpdate={updateMachineStatus}
          />
        </Dashboard>
      </div>
    );
};

export default SetMachineStatusPanel;
