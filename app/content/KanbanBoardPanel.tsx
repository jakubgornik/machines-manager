import React from "react";
import { useSession } from "next-auth/react";
import { useGetUserId } from "../hooks/useGetUserId";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import KanbanTable from "../components/KanbanTable";
import KanbanTableMobile from "../components/KanbanTableMobile";
import DataTable from "../components/DataTable";

const KanbanBoardPanel = () => {
  const { data: session } = useSession();
  const userId = useGetUserId();
  const userMachines = useGetUserMachines(userId).filter(
    (machine) => machine !== null,
  );

  const userMachinesWithAvailableStatus = userMachines.filter(
    (machine) => machine.status === "Wolne",
  );

  const userMachinesWithServicedStatus = userMachines.filter(
    (machine) => machine.status === "Serwisowane",
  );

  const userMachinesWithRentedStatus = userMachines.filter(
    (machine) => machine.status === "Wynajmowane",
  );

  if (session)
    return (
      <>
        <div className="hidden w-full justify-between gap-3 pb-16 sm:flex">
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
        <div className="flex w-full justify-center sm:hidden">
          {/* siwper */}
          {/* kanbanmobiletabel to swiperslide dodac css guziki itd */}
          <KanbanTableMobile
            data={userMachinesWithAvailableStatus}
            status="Wolne"
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
