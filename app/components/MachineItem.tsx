"use client";
import React from "react";
import { useRouter } from "next/navigation";

const MachineItem = ({ machine }: { machine: machineData }) => {
  const router = useRouter();
  const handleModifyItem = () => {
    router.push(`/machines/${machine.id}`);
  };

  // todo style machineitem
  return (
    <div
      onClick={handleModifyItem}
      className="h-[80px] w-full cursor-pointer bg-slate-50 text-black sm:w-[80px]"
    >
      {machine.machineName}
    </div>
  );
};

export default MachineItem;
