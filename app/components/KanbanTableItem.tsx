import React from "react";
import Link from "next/link";

const KanbanTableItem = ({ data }: { data: machineData }) => {
  return (
    <Link href={`/machines/setstatus/${data.id}`}>
      <div className="flex cursor-pointer items-center gap-1 border-b-2 border-gray-800 px-2 transition-all duration-300 hover:bg-slate-800 hover:bg-opacity-50 sm:flex-col sm:py-2 sm:text-center lg:flex-row lg:justify-evenly lg:py-4">
        <span className="font-semibold text-lighterBlue xl:min-w-[33%]">
          {data.machineName}
        </span>
        <span className=" text-white xl:min-w-[33%]">{data.machineDesc}</span>
        <span
          className={`font-semibold xl:min-w-[33%] ${
            data.status === "Wolne"
              ? "text-green-600"
              : data.status === "Serwisowane"
              ? "text-yellow-200"
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
