import React from "react";
import { useSession } from "next-auth/react";
import { useGetUserId } from "../hooks/useGetUserId";
import { useGetUserMachines } from "../hooks/useGetUserMachines";

const KanbanBoardPanel = () => {
  const { data: session } = useSession();
  const userId = useGetUserId();
  const userMachines = useGetUserMachines(userId).filter(
    (machine) => machine !== null,
  );

  // todo filter userMachines by status
  // create 3 kanbandesks with props data to display
  // on mobile display as a slider

  // below slider display like this
  // Status Wolne:
  // list , every item contain machine name desc owner status
  if (session) return <div>KanbanBoardPanel</div>;
};

export default KanbanBoardPanel;
