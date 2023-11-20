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
    <div className="sm:text mb-8 w-full text-[0.5rem] sm:text-[0.8rem] lg:text-base">
      {data.length !== 0 ? (
        <span className="text-lg font-semibold text-gray-900 dark:text-lighterBlue md:text-xl">
          / {header}
        </span>
      ) : null}
      <div className="mt-4 bg-gray-200 duration-300 hover:bg-opacity-80 dark:bg-gray-900 dark:hover:bg-opacity-70">
        {data.map((el) => (
          <Link key={el.id} href={`/machines/setstatus/${el.id}`}>
            <div className="flex border-b border-gray-800 px-2 py-2 duration-300 hover:bg-gray-400 hover:bg-opacity-50 dark:border-b-2 dark:hover:bg-slate-800">
              <div className="flex w-[20%] flex-col gap-2 pr-1">
                <span className="font-semibold text-gray-900 dark:text-lighterBlue">
                  Machine name
                </span>
                <span className="break-all text-gray-800 dark:text-white">
                  {el.machineName}
                </span>
              </div>

              <div className="flex w-[20%] flex-col gap-2 pr-1">
                <span className="font-semibold text-gray-900 dark:text-lighterBlue">
                  Machine description
                </span>
                <span className="break-all text-gray-800 dark:text-white">
                  {el.machineDesc}
                </span>
              </div>

              <div className="flex w-[20%] flex-col gap-2 pr-1">
                <span className="font-semibold text-gray-900 dark:text-lighterBlue">
                  Client
                </span>
                <span className="break-all text-gray-800 dark:text-white">
                  {el.owner === "" ? "Empty" : el.owner}
                </span>
              </div>

              <div className="flex w-[20%] flex-col gap-2 pr-1">
                <span className="font-semibold text-gray-900 dark:text-lighterBlue">
                  Localization
                </span>
                <span className="break-all text-gray-800 dark:text-white">
                  {el.ownerLocalization === "" ? "Empty" : el.ownerLocalization}
                </span>
              </div>

              <div className="flex w-[20%] flex-col gap-2 pr-1">
                <span className="font-semibold text-gray-900 dark:text-lighterBlue">
                  Status
                </span>
                <span className="break-all text-gray-800 dark:text-white">
                  <span
                    className={`font-semibold  ${
                      el.status === "Wolne"
                        ? "text-green-600"
                        : el.status === "Serwisowane"
                        ? "text-orange-400"
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
