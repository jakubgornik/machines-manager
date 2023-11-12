"use client";

import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGetUserId } from "../hooks/useGetUserId";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import { useSession } from "next-auth/react";
import MachineItem from "../components/MachineItem";

const MachinesPanel = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const userId = useGetUserId();
  const userMachines = useGetUserMachines(userId);

  console.log(userId);
  console.log(userMachines);

  const handleAddNewMachine = () => {
    router.push("/machines/addmachine");
  };

  if (session)
    return (
      <>
        <div
          className="duration-30 group flex h-[80px] w-[80px] cursor-pointer items-center justify-center border-2 border-lightBlue bg-lighterBlue p-4"
          onClick={handleAddNewMachine}
        >
          <div className="rounded-full bg-lighterBlue p-4 duration-300 group-hover:bg-lightBlue">
            <FaPlus className="fill-gray-800" />
          </div>
        </div>
        {/* todo style machines items */}
        {userMachines &&
          userMachines.map((el) => <MachineItem key={el.id} machine={el} />)}
      </>
    );
};

export default MachinesPanel;
