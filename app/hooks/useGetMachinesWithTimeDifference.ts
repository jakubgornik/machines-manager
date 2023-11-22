import { useMemo } from "react";
import { differenceInMinutes, parseISO, isValid } from "date-fns";
import { MachineData } from "@/types";

const useGetMachinesWithTimeDifference = (data: MachineData[]) => {
  const machinesWithDifferenceArray = useMemo(() => {
    const calculateTimeDifference = () => {
      return data.map((item) => {
        const startDate = item.startDate
          ? parseISO(item.startDate)
          : new Date();
        const endDate = item.endDate ? parseISO(item.endDate) : new Date();

        if (!isValid(startDate) || !isValid(endDate)) {
          return { ...item, timeDifference: 0 };
        }

        const timeDifferenceInMinutes = differenceInMinutes(endDate, startDate);
        const hours = Math.floor(timeDifferenceInMinutes / 60);
        const minutes = timeDifferenceInMinutes % 60;
        const combinedHours = hours + minutes / 60;

        return {
          ...item,
          timeDifference: combinedHours,
        };
      });
    };

    return calculateTimeDifference();
  }, [data]);

  return machinesWithDifferenceArray;
};

export { useGetMachinesWithTimeDifference };
