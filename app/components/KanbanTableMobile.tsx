import React from "react";
import KanbanTableItem from "./KanbanTableItem";
import { MachineData } from "@/types";

const KanbanTableMobile = ({
  data,
  status,
}: {
  status: string;
  data: MachineData[];
}) => {
  return (
    <div className="flex h-full w-[100%] flex-col overflow-hidden rounded-t-lg bg-white/70 transition-all duration-300 hover:bg-white/50 hover:bg-opacity-20 dark:bg-gray-900 dark:hover:bg-opacity-70">
      <span className="flex w-full items-center justify-center gap-1 bg-gray-500 py-2 font-semibold text-gray-900 dark:bg-lighterBlue sm:flex-col md:text-xl lg:flex-row lg:gap-1">
        <span>Machines</span>
        {status}
      </span>
      {data.map((el) => (
        <KanbanTableItem key={el.id} data={el} />
      ))}
      {data.length === 0 && <div className="h-[5vh]"></div>}
    </div>
  );
};

export default KanbanTableMobile;
