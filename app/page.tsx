"use client";
import { signOut, useSession } from "next-auth/react";
import Container from "./components/Container";
import Link from "next/link";

const Home = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Container>
        <main className="flex justify-center items-center h-screen">
          <div className="w-full flex flex-col items-center gap-4 max-w-[300px] sm:max-w-[800px] shadow-lg bg-gray-800 py-12 sm:py-16 rounded-md">
            <h2 className="text-center sm:pt-12 pb-2 sm:pb-4 px-3 tracking-wide text-white text-2xl">
              The Next{" "}
              <span className="bg-gradient-to-l from-lighterBlue to-lightBlue bg-clip-text font-extrabold text-transparent">
                Generation
              </span>{" "}
              Manager
            </h2>
            <span className="text-center text-lg sm:text-2xl font-semibold leading-9 tracking-tight text-white px-6 mx:px-3">
              Acces is denied, you first need to be authenticated
            </span>
            <Link
              href="/signin"
              className="mt-6 text-lightBlue hover:text-white text-xl font-semibold flex justify-center gap-2  items-center sm:text-base  w-3/4 h-12 rounded-sm border border-lightBlue transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60"
            >
              Get authenticated
            </Link>
          </div>
        </main>
      </Container>
    );
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[800px] h-[400px] bg-gray-800 flex flex-col justify-center items-center">
        <div className="text-white">{session.user?.name}</div>
        <button onClick={() => signOut()} className="text-lightBlue">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
