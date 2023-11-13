"use client";
import React from "react";
import { useRouter } from "next/navigation";

const MachineItemWithStatus = ({ machine }: { machine: machineData }) => {
  const router = useRouter();

  return (
    <div className="flex min-h-[140px] w-full flex-col items-center justify-center gap-2 rounded-md border border-lighterBlue bg-gray-900 px-3 py-3 shadow-2xl duration-500 hover:bg-opacity-70 sm:w-[240px] ">
      <span className="text-lg font-semibold text-lighterBlue">
        {machine.machineName}
      </span>
      <span className="font-thin text-white">{machine.machineDesc}</span>
      <span className="break-all font-thin text-white">{`id: #${machine.id}`}</span>
      <span className="font-semibold  text-lighterBlue">
        Status:{" "}
        <span
          className={`${
            machine.status === "Wolne"
              ? "text-lighterBlue"
              : machine.status === "Serwisowane"
              ? "text-yellow-200"
              : "text-purple-400"
          }`}
        >
          {machine.status}
        </span>
      </span>
      <button
        onClick={() => router.push(`/machines/setstatus/${machine.id}`)}
        type="button"
        className="my-2 flex h-8 w-[40%] items-center  justify-center  rounded-sm border border-lighterBlue px-4 text-xs font-medium text-lighterBlue transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60 hover:text-white sm:w-[50%] sm:text-base"
      >
        Set status
      </button>
    </div>
  );
};

export default MachineItemWithStatus;
