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
      className="flex min-h-[140px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-gray-900 bg-white/70 px-3 py-3 shadow-2xl duration-500 hover:bg-opacity-70 dark:border-lighterBlue dark:bg-gray-900 sm:w-[240px] "
    >
      <span className="text-lg font-semibold text-gray-900 dark:text-lighterBlue">
        {machine.machineName}
      </span>
      <span className="font-thin text-gray-800 dark:text-white">
        {machine.machineDesc}
      </span>
      <span className="break-all font-thin text-gray-800 dark:text-white">{`#${machine.id}`}</span>
    </div>
  );
};

export default MachineItem;
