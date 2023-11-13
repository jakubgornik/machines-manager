"use client";

import React from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import { useSession } from "next-auth/react";
import MachineItemWithStatus from "../components/MachineItemWithStatus";

const MachinesStatusPanel = () => {
  const { data: session } = useSession();

  const userId = useGetUserId();
  const userMachines = useGetUserMachines(userId);

  if (session)
    return (
      <>
        {userMachines &&
          userMachines.map((el) => (
            <MachineItemWithStatus key={el.id} machine={el} />
          ))}
      </>
    );
};

export default MachinesStatusPanel;
