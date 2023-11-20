import React from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import Link from "next/link";
import { parseISO } from "date-fns";
import { useGetUserId } from "../hooks/useGetUserId";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";

const Timetable = () => {
  const userId = useGetUserId();
  const userMachines = useGetUserMachines(userId).filter(
    (machine) => machine !== null,
  );

  const convertData = (machinesData: machineData[]): ProcessedEvent[] => {
    return machinesData
      .map((machine) => {
        const {
          id,
          machineName,
          machineDesc,
          status,
          owner,
          startDate,
          endDate,
        } = machine;

        if (!startDate || !endDate) {
          return null;
        }

        const color =
          status === "Wynajmowane"
            ? "#c084fc"
            : status === "Serwisowane"
            ? "#fde047"
            : "#73abd1";
        const title = `${machineName}, ${machineDesc}, client: ${owner}`;
        const startWithConvertedType = parseISO(startDate);
        const endWithConvertedType = parseISO(endDate);

        return {
          event_id: id,
          title: title,
          color,
          owner,
          start: startWithConvertedType,
          end: endWithConvertedType,
          editable: false,
          deletable: false,
          draggable: false,
        };
      })
      .filter(Boolean) as ProcessedEvent[];
  };

  const convertedData: ProcessedEvent[] = convertData(userMachines);

  return (
    <>
      <div className="flex h-[10vh] flex-col items-center justify-center">
        <Link href={"/"}>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-sm border border-lightBlue px-6 py-4 text-xs font-medium text-white transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60 sm:text-base"
          >
            Back to main page
          </button>
        </Link>
      </div>
      <Scheduler
        events={convertedData}
        day={{ startHour: 8, endHour: 24, step: 60 }}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 6,
          startHour: 8,
          endHour: 24,
          step: 60,
        }}
      />
    </>
  );
};

export default Timetable;
