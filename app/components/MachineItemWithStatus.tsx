"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MachineData } from "@/types";

const MachineItemWithStatus = ({ machine }: { machine: MachineData }) => {
  const router = useRouter();

  return (
    <div className="flex min-h-[140px] w-full flex-col items-center justify-center gap-2 rounded-md border border-gray-900 bg-white/70 px-3 py-3 shadow-2xl duration-500 hover:bg-opacity-70 dark:border-lighterBlue dark:bg-gray-900 sm:w-[240px] ">
      <span className="text-lg font-semibold text-gray-900 dark:text-lighterBlue">
        {machine.machineName}
      </span>
      <span className="font-thin text-gray-800 dark:text-white">
        {machine.machineDesc}
      </span>
      <span className="break-all font-thin text-gray-800 dark:text-white">{`#${machine.id}`}</span>
      <span className="text-gray-800 dark:text-white">
        Status:{" "}
        <span
          className={`font-semibold ${
            machine.status === "Wolne"
              ? "text-green-600"
              : machine.status === "Serwisowane"
              ? "text-orange-400"
              : "text-purple-400"
          }`}
        >
          {machine.status}
        </span>
      </span>
      <button
        onClick={() => router.push(`/machines/setstatus/${machine.id}`)}
        type="button"
        className="my-2 flex h-8 w-[40%] items-center justify-center rounded-sm border border-gray-900 px-4 text-xs font-medium text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:bg-opacity-60 hover:text-white dark:border-lighterBlue dark:text-lighterBlue dark:hover:bg-lightBlue dark:hover:text-white sm:w-[50%] sm:text-base"
      >
        Set status
      </button>
    </div>
  );
};

export default MachineItemWithStatus;
