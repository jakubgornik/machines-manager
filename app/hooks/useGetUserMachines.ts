import { useState, useEffect } from "react";

const useGetUserMachines = (userId: string) => {
  const [userMachines, setUserMachines] = useState<machineData[] | null>(null);
  // todo handle states like loading
  useEffect(() => {
    const fetchUserMachines = async () => {
      try {
        const response = await fetch(
          `https://machinesv2-default-rtdb.europe-west1.firebasedatabase.app/${userId}/machines.json`,
        );
        const fetchedData = await response.json();
        setUserMachines(fetchedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserMachines();
  }, [userId]);

  return userMachines;
};

export { useGetUserMachines };
