import { useState, useEffect } from "react";
import { MachineData } from "@/types";

const useGetUserMachines = (userId: string | undefined) => {
  const [userMachines, setUserMachines] = useState<MachineData[]>([]);
  // todo handle states like loading
  useEffect(() => {
    const fetchUserMachines = async () => {
      try {
        if (!userId) {
          setUserMachines([]);
          return;
        }
        const response = await fetch(
          `https://machinesv2-default-rtdb.europe-west1.firebasedatabase.app/${userId}/machines.json`,
        );
        const fetchedData = await response.json();
        if (Array.isArray(fetchedData)) {
          setUserMachines(fetchedData as MachineData[]);
        } else if (typeof fetchedData === "object" && fetchedData !== null) {
          const dataArray = Object.keys(fetchedData).map(
            (key) => fetchedData[key],
          ) as MachineData[];
          setUserMachines(dataArray);
        } else {
          setUserMachines([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserMachines();
  }, [userId]);

  return userMachines;
};

export { useGetUserMachines };
