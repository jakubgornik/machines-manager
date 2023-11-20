"use client";
import { useSession } from "next-auth/react";
import Navigation from "../components/Navigation";
import Dashboard from "../components/Dashboard";
import StatisticsPanel from "../content/StatisticsPanel";
import { useRouter } from "next/navigation";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.replace("/");
  }

  if (session)
    return (
      <div className="flex h-screen w-full flex-col sm:flex-row">
        <Navigation />
        <Dashboard title="statistics">
          <StatisticsPanel />
        </Dashboard>
      </div>
    );
};

export default Home;
