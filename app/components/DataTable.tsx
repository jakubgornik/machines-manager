import React from "react";
import Link from "next/link";

const DataTable = ({
  data,
  header,
}: {
  data: machineData[];
  header: string;
}) => {
  return (
    <div className="sm:text mb-4 w-full text-[0.5rem] sm:text-[0.8rem] lg:text-base">
      <span className=" text-lg font-semibold text-lighterBlue md:text-xl">
        / {header}
      </span>
      <div className="bg-gray-900 duration-300  hover:bg-opacity-70">
        {data.map((el) => (
          <Link href={`/machines/setstatus/${el.id}`}>
            <div className="flex border-b-2 border-gray-800 px-2 py-2 duration-300 hover:bg-slate-800 hover:bg-opacity-50">
              <div className="flex w-[20%] flex-col gap-2 pr-1">
                <span className="font-semibold text-lighterBlue">Name</span>
                <span className="break-all text-white">{el.machineName}</span>
              </div>

              <div className="flex w-[20%] flex-col gap-2 pr-1">
                <span className="font-semibold text-lighterBlue">
                  Description
                </span>
                <span className="break-all  text-white">{el.machineDesc}</span>
              </div>

              <div className="flex w-[20%] flex-col gap-2 pr-1">
                <span className="font-semibold text-lighterBlue">Owner</span>
                <span className="break-all  text-white ">
                  {el.owner === "" ? "Empty" : el.owner}
                </span>
              </div>

              <div className="flex w-[20%] flex-col gap-2 pr-1">
                <span className="font-semibold text-lighterBlue">
                  Localization
                </span>
                <span className="break-all  text-white ">
                  {el.ownerLocalization === "" ? "Empty" : el.ownerLocalization}
                </span>
              </div>

              <div className="flex w-[20%] flex-col gap-2 pr-1">
                <span className="font-semibold text-lighterBlue">Status</span>
                <span className="break-all  text-white ">
                  <span
                    className={`font-semibold  ${
                      el.status === "Wolne"
                        ? "text-green-600"
                        : el.status === "Serwisowane"
                        ? "text-yellow-200"
                        : "text-purple-400"
                    }`}
                  >
                    {el.status}
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
