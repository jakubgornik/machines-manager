"use client";
import { useSession } from "next-auth/react";
import Navigation from "../components/Navigation";
import Dashboard from "../components/Dashboard";
import StatisticsPanel from "../content/StatisticsPanel";

const Home = () => {
  const { data: session } = useSession();

  if (session)
    return (
      <div className="flex h-[100dvh] w-full flex-col sm:flex-row">
        <Navigation />
        <Dashboard title="statistics">
          <StatisticsPanel />
        </Dashboard>
      </div>
    );
};

export default Home;
