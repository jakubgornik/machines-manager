"use client";

import React from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import { useRouter } from "next/navigation";
import { MachineData } from "@/types";

const Timetable = () => {
  const { data: session } = useSession();

  const userId = session?.user?.id;
  const userMachines = useGetUserMachines(userId).filter(
    (machine) => machine !== null,
  );

  const router = useRouter();

  const convertData = (machinesData: MachineData[]): ProcessedEvent[] => {
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
          status === "Rented"
            ? "#8654C5"
            : status === "Serviced"
            ? "#F2B412"
            : "#05C801";
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

  if (session)
    return (
      <>
        <div className="flex h-[10vh] flex-col items-center justify-center">
          <button
            onClick={() => router.back()}
            type="button"
            className="flex items-center justify-center gap-2 rounded-sm border border-gray-900 px-6 py-4 text-xs font-medium text-white transition-all duration-300 hover:bg-gray-900/50 hover:bg-opacity-60 dark:border-lightBlue dark:hover:bg-lightBlue sm:text-base"
          >
            Back to previous page
          </button>
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
