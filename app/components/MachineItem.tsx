"use client";
import React from "react";
import { useRouter } from "next/navigation";

const MachineItem = ({ machine }: { machine: machineData }) => {
  const router = useRouter();
  const handleModifyItem = () => {
    router.push(`/machines/${machine.id}`);
  };

  return (
    <div
      onClick={handleModifyItem}
      className="flex min-h-[140px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-lighterBlue bg-gray-900 px-3 py-3 shadow-2xl duration-500 hover:bg-opacity-70 sm:w-[240px] "
    >
      <span className="text-lg font-semibold text-lighterBlue">
        {machine.machineName}
      </span>
      <span className="font-thin text-white">{machine.machineDesc}</span>
      <span className="break-all font-thin text-white">{`id #${machine.id}`}</span>
    </div>
  );
};

export default MachineItem;
