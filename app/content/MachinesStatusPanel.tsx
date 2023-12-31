"use client";

import React from "react";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import { useSession } from "next-auth/react";
import MachineItemWithStatus from "../components/MachineItemWithStatus";
import { Search } from "../components/Search";
import { useState, useCallback } from "react";

const MachinesStatusPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();

  const userId = session?.user?.id;
  const userMachines = useGetUserMachines(userId).filter(
    (machine) => machine !== null,
  );

  const handleSearch = useCallback(
    (searchTerm: string) => {
      setSearchTerm(searchTerm);
    },
    [setSearchTerm],
  );

  if (session)
    return (
      <>
        {userMachines &&
          (searchTerm === ""
            ? userMachines.map((el) => (
                <MachineItemWithStatus key={el.id} machine={el} />
              ))
            : userMachines
                .filter((el) => {
                  return (
                    (el.status &&
                      el.status
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())) ||
                    (el.owner &&
                      el.owner.toLowerCase().includes(searchTerm.toLowerCase()))
                  );
                })
                .map((el) => (
                  <MachineItemWithStatus key={el.id} machine={el} />
                )))}
        <Search onSearchChange={handleSearch} filterBy={"status or owner"} />
      </>
    );
};

export default MachinesStatusPanel;
