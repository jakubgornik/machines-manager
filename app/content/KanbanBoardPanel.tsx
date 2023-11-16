import React from "react";
import { useSession } from "next-auth/react";
import { useGetUserId } from "../hooks/useGetUserId";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import KanbanTable from "../components/KanbanTable";
import DataTable from "../components/DataTable";

const KanbanBoardPanel = () => {
  const { data: session } = useSession();
  const userId = useGetUserId();
  const userMachines = useGetUserMachines(userId).filter(
    (machine) => machine !== null,
  );

  const userMachinesWithAvailableStatus = userMachines.filter((machine) => {
    return machine.status === "Wolne";
  });

  const userMachinesWithServicedStatus = userMachines.filter((machine) => {
    return machine.status === "Serwisowane";
  });

  const userMachinesWithRentedStatus = userMachines.filter((machine) => {
    return machine.status === "Wynajmowane";
  });

  console.log(userMachinesWithServicedStatus);

  if (session)
    return (
      <>
        <div className=" hidden w-full gap-4 pb-16 sm:flex">
          <KanbanTable data={userMachinesWithAvailableStatus} status="Wolne" />
          <KanbanTable
            data={userMachinesWithServicedStatus}
            status="Serwisowane"
          />
          <KanbanTable
            data={userMachinesWithRentedStatus}
            status="Wynajmowane"
          />
        </div>
        <DataTable
          data={userMachinesWithAvailableStatus}
          header="Maszyny Wolne"
        />
        <DataTable
          data={userMachinesWithServicedStatus}
          header="Maszyny Serwisowane"
        />
        <DataTable
          data={userMachinesWithRentedStatus}
          header="Maszyny Wynajmowane"
        />
      </>
    );
};

export default KanbanBoardPanel;
