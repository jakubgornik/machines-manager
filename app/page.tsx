"use client";
import { useSession } from "next-auth/react";
import Container from "./components/Container";
import Link from "next/link";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import MachinesPanel from "./content/MachinesPanel";

const Home = () => {
  const { data: session } = useSession();

  console.log(session?.user?.id);

  if (session)
    return (
      <div className="flex h-[100dvh] w-full flex-col sm:flex-row">
        <Navigation />
        <Dashboard title="manage machines">
          <MachinesPanel />
          <div className="fixed right-5 top-10 hidden sm:flex"></div>
        </Dashboard>
      </div>
    );

  return (
    <Container>
      <main className="flex h-[100dvh] items-center justify-center">
        <div className="flex w-full max-w-[300px] flex-col items-center gap-4 rounded-md bg-gray-800 py-12 shadow-lg sm:max-w-[800px] sm:py-16">
          <h2 className="px-3 pb-2 text-center text-2xl tracking-wide text-white sm:pb-4 sm:pt-12">
            The Next{" "}
            <span className="bg-gradient-to-l from-lighterBlue to-lightBlue bg-clip-text font-extrabold text-transparent">
              Generation
            </span>{" "}
            Manager
          </h2>
          <span className="mx:px-3 px-6 text-center text-lg font-semibold leading-9 tracking-tight text-white sm:text-2xl">
            Acces is denied, you first need to be authenticated
          </span>
          <Link
            href="/signin"
            className="mt-6 flex h-12 w-3/4 items-center justify-center gap-2 rounded-sm  border border-lightBlue  text-xl font-semibold text-lightBlue transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60 hover:text-white sm:text-base"
          >
            Get authenticated
          </Link>
        </div>
      </main>
    </Container>
  );
};

export default Home;
