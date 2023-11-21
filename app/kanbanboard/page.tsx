"use client";

import { useSession } from "next-auth/react";
import Navigation from "../components/Navigation";
import Dashboard from "../components/Dashboard";
import KanbanBoardPanel from "../content/KanbanBoardPanel";

const KanbanBoard = () => {
  const { data: session } = useSession();

  if (session)
    return (
      <div className="flex h-screen w-full flex-col sm:flex-row">
        <Navigation />
        <Dashboard title="kanban board">
          <KanbanBoardPanel />
        </Dashboard>
      </div>
    );
};

export default KanbanBoard;
