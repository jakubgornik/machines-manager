import { useState, useEffect } from "react";

const useGetUserMachines = (userId: string) => {
  const [userMachines, setUserMachines] = useState<machineData[]>([]);
  // todo handle states like loading
  useEffect(() => {
    const fetchUserMachines = async () => {
      try {
        if (!userId) {
          return;
        }
        const response = await fetch(
          `https://machinesv2-default-rtdb.europe-west1.firebasedatabase.app/${userId}/machines.json`,
        );
        const fetchedData = await response.json();
        if (Array.isArray(fetchedData)) {
          setUserMachines(fetchedData as machineData[]);
        } else if (typeof fetchedData === "object" && fetchedData !== null) {
          const dataArray = Object.keys(fetchedData).map(
            (key) => fetchedData[key],
          ) as machineData[];
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
