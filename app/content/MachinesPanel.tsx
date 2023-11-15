"use client";

import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGetUserId } from "../hooks/useGetUserId";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import { useSession } from "next-auth/react";
import MachineItem from "../components/MachineItem";
import { Search } from "../components/Search";
import { useState } from "react";

const MachinesPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();

  const router = useRouter();

  const userId = useGetUserId();
  const userMachines = useGetUserMachines(userId).filter(
    (machine) => machine !== null,
  );

  // console.log(userMachines);

  const handleAddNewMachine = () => {
    router.push("/machines/addmachine");
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
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
          (searchTerm === ""
            ? userMachines.map((el) => <MachineItem key={el.id} machine={el} />)
            : userMachines
                .filter((el) => {
                  return (
                    (el.machineName &&
                      el.machineName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())) ||
                    (el.machineDesc &&
                      el.machineDesc
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
                  );
                })
                .map((el) => <MachineItem key={el.id} machine={el} />))}

        <Search onSearchChange={handleSearch} filterBy={"name or desc"} />
      </>
    );
};

export default MachinesPanel;
