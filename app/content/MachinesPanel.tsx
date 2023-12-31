"use client";

import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import { useSession } from "next-auth/react";
import MachineItem from "../components/MachineItem";
import { Search } from "../components/Search";
import { useState, useCallback } from "react";

const MachinesPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const userId = session?.user?.id;
  const userMachines = useGetUserMachines(userId).filter(
    (machine) => machine !== null,
  );

  const handleAddNewMachine = useCallback(() => {
    router.push("/machines/addmachine");
  }, [router]);

  const handleSearch = useCallback(
    (searchTerm: string) => {
      setSearchTerm(searchTerm);
    },
    [setSearchTerm],
  );

  if (session)
    return (
      <>
        <div
          className="group flex min-h-[140px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-gray-900 bg-gray-500 px-3 py-3 duration-300 hover:border-gray-900 hover:bg-white/70 dark:bg-lightBlue dark:hover:border-lighterBlue dark:hover:bg-gray-900 sm:w-[240px] "
          onClick={handleAddNewMachine}
        >
          <FaPlus className="fill-gray-900  duration-300 group-hover:fill-gray-900 dark:group-hover:fill-lighterBlue" />
          <span className="pointer-events-none font-semibold text-gray-900 duration-300 group-hover:text-gray-900 dark:group-hover:text-lighterBlue">
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
