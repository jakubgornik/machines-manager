import React from "react";
import KanbanTableItem from "./KanbanTableItem";

const KanbanTable = ({
  data,
  status,
}: {
  status: string;
  data: machineData[];
}) => {
  return (
    <div className="h-full w-[33%] overflow-hidden rounded-t-lg bg-gray-900 transition-all duration-300 hover:bg-opacity-70">
      <span className="flex w-full flex-shrink items-center justify-center bg-lighterBlue py-2 font-semibold text-gray-800 sm:flex-col lg:flex-row lg:gap-1 lg:text-lg">
        <span>Maszyny</span>
        {status}
      </span>
      {data.map((el) => (
        <KanbanTableItem key={el.id} data={el} />
      ))}
    </div>
  );
};

export default KanbanTable;
