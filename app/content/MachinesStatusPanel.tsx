"use client";

import React from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import { useSession } from "next-auth/react";
import MachineItemWithStatus from "../components/MachineItemWithStatus";

const MachinesStatusPanel = () => {
  const { data: session } = useSession();

  const userId = useGetUserId();
  const userMachines = useGetUserMachines(userId).filter(
    (machine) => machine !== null,
  );

  console.log(userMachines);

  if (session)
    return (
      <>
        {/* zmienic render */}
        {userMachines &&
          userMachines.map((el) => (
            <MachineItemWithStatus key={el.id} machine={el} />
          ))}
        {/* tutaj search component fixed */}
      </>
    );
};

export default MachinesStatusPanel;

// {
//   userMachines && searchTerm === ""
//     ? userMachines.map((el) => (
//         <MachineItemWithStatus key={el.id} machine={el} />
//       ))
//     : // ten ponizej dodac jakies sprawdzanie values wszystkich property i wyswietlac
//       // te obiekty ktory searchTerm sie zgadza z ktoryms z value
//       userMachines.map((el) => (
//         <MachineItemWithStatus key={el.id} machine={el} />
//       ));
// }
