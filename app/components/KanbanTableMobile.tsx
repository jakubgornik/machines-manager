import React from "react";
import KanbanTableItem from "./KanbanTableItem";

const KanbanTableMobile = ({
  data,
  status,
}: {
  status: string;
  data: machineData[];
}) => {
  return (
    <div className="flex h-full w-[100%] flex-col overflow-hidden rounded-t-lg bg-gray-900 transition-all duration-300 hover:bg-opacity-70">
      <span className="flex w-full items-center justify-center gap-1 bg-lighterBlue py-2 font-semibold text-gray-800 sm:flex-col md:text-xl lg:flex-row lg:gap-1">
        <span>Maszyny</span>
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
