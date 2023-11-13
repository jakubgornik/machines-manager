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

  // console.log(userId);
  // console.log(userMachines);

  const handleAddNewMachine = () => {
    router.push("/machines/addmachine");
  };

  if (session)
    return (
      <>
        <div
          className="group flex min-h-[140px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-lighterBlue bg-gray-900 px-3 py-3 duration-500 hover:bg-opacity-70 sm:w-[240px] "
          onClick={handleAddNewMachine}
        >
          <FaPlus className="fill-lighterBlue duration-300 group-hover:fill-lightBlue" />
          <span className="pointer-events-none font-semibold text-lighterBlue">
            Add new machine
          </span>
        </div>
        {userMachines &&
          userMachines.map((el) => <MachineItem key={el.id} machine={el} />)}
      </>
    );
};

export default MachinesPanel;
