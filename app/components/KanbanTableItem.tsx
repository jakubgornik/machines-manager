import React from "react";
import Link from "next/link";
import { MachineData } from "@/types";

const KanbanTableItem = ({ data }: { data: MachineData }) => {
  return (
    <Link href={`/machines/setstatus/${data.id}`}>
      <div className="flex cursor-pointer flex-col items-center justify-evenly gap-1 border-b border-gray-800 px-2 py-1 text-[0.8rem] transition-all duration-300 hover:bg-gray-400 hover:bg-opacity-50 dark:border-b-2 dark:hover:bg-slate-800 dark:hover:bg-opacity-50 sm:flex sm:py-2 sm:text-center lg:flex-row lg:py-4">
        <span className="break-all font-semibold text-gray-900 dark:text-lighterBlue xl:min-w-[33%]">
          {data.machineName}
        </span>
        <span className="break-all text-gray-900 dark:text-white xl:min-w-[33%]">
          {data.machineDesc}
        </span>
        <span
          className={`font-semibold xl:min-w-[33%] ${
            data.status === "Wolne"
              ? "text-green-600"
              : data.status === "Serwisowane"
              ? "text-orange-400"
              : "text-purple-400"
          }`}
        >
          {data.status}
        </span>
      </div>
    </Link>
  );
};

export default KanbanTableItem;
