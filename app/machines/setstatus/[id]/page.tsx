"use client";

import React from "react";
import ManageMachinesStatus from "@/app/components/ManageMachinesStatus";
import { useGetUserId } from "@/app/hooks/useGetUserId";
import { useRouter } from "next/navigation";

const SetMachineStatusPanel = ({ params }: { params: { id: string } }) => {
  const userId = useGetUserId();
  const router = useRouter();

  const handleStatusUpdate = async () => {
    // todo and pass as prop
    router.push("/machinesstatus");
  };
  return (
    <>
      <ManageMachinesStatus userId={userId} id={params.id} />
    </>
  );
};

export default SetMachineStatusPanel;
