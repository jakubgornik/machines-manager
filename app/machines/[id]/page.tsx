"use client";

import React from "react";
import ManageMachines from "@/app/components/ManageMachines";
import Navigation from "@/app/components/Navigation";
import Dashboard from "@/app/components/Dashboard";
import { useSession } from "next-auth/react";
import { useGetUserId } from "@/app/hooks/useGetUserId";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const ModifyMachinePanel = ({ params }: { params: { id: string } }) => {
  const userId = useGetUserId();
  const router = useRouter();
  const { data: session } = useSession();

  const updateMachine = useCallback(
    async (
      userId: string,
      machineToUpdateId: string,
      newData: Partial<machineData>,
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

        router.push("/");
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update machine");
      }
    },
    [router],
  );

  const deleteMachine = useCallback(
    async (userId: string, machineToDeleteId: string): Promise<void> => {
      try {
        const res = await fetch(
          `https://machinesv2-default-rtdb.europe-west1.firebasedatabase.app/${userId}/machines.json`,
        );
        const fetchedData = await res.json();

        const machineIdToDelete = Object.keys(fetchedData || {}).find(
          (machineId) => fetchedData[machineId]?.id === machineToDeleteId,
        );

        if (!machineIdToDelete) {
          throw new Error("Machine not found");
        }

        await fetch(
          `https://machinesv2-default-rtdb.europe-west1.firebasedatabase.app/${userId}/machines/${machineIdToDelete}.json`,
          {
            method: "DELETE",
          },
        );

        router.push("/");
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete machine");
      }
    },
    [router],
  );

  if (!session) {
    router.replace("/");
  }
  return (
    <div className="flex h-screen w-full flex-col sm:flex-row">
      <Navigation />
      <Dashboard title="modify machine">
        <ManageMachines
          id={params.id}
          userId={userId}
          onDelete={deleteMachine}
          onUpdate={updateMachine}
        />
      </Dashboard>
    </div>
  );
};

export default ModifyMachinePanel;
