import React from "react";
import KanbanTableItem from "./KanbanTableItem";
import { MachineData } from "@/types";

const KanbanTable = ({
  data,
  status,
}: {
  status: string;
  data: MachineData[];
}) => {
  return (
    <div className="h-full w-[33%] overflow-hidden rounded-t-lg bg-white/70 transition-all duration-300 hover:bg-white/50 dark:bg-gray-900 dark:hover:bg-opacity-70">
      <span className="flex w-full flex-shrink items-center justify-center bg-gray-500 py-2 font-semibold text-gray-900 dark:bg-lighterBlue sm:flex-col lg:flex-row lg:gap-1 lg:text-lg">
        {status}
        <span>Machines</span>
      </span>
      {data.map((el) => (
        <KanbanTableItem key={el.id} data={el} />
      ))}
    </div>
  );
};

export default KanbanTable;
