"use client";
import { signOut, useSession } from "next-auth/react";
import Container from "./components/Container";
import Link from "next/link";
import { db, auth } from "./firebase";
import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";

const testData: machineData = {
  id: 1,
  machineDesc: "machineDesc",
  machineName: "machinev1",
  startDate: new Date(2023, 10, 3, 8),
  endDate: new Date(2023, 12, 5, 10, 12),
  owner: "testOwner",
  ownerMail: "ownerMail",
  pricePerHour: 100,
  status: "Wolny",
  ownerLocalization: "Gliwice",
};

const Home = () => {
  const { data: session } = useSession();
  const [machinesData, setMachinesData] = useState<machineData[]>([]);
  const [userId, setUserId] = useState("");

  // todo
  useEffect(() => {
    // fetch machines data from /machines/${userId} and popualte with .map
  }, []);

  useEffect(() => {
    const getUserIdFromSession = async () => {
      try {
        const sessionsRef = collection(db, "sessions");
        const q = query(sessionsRef);
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          return null;
        }

        const sessionData = querySnapshot.docs[0].data();
        const userId = sessionData.userId;
        setUserId(userId);
      } catch (error) {
        console.error("Error getting user ID from session:", error);
      }
    };
    getUserIdFromSession();
  }, []);

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  useEffect(() => {
    console.log(auth.currentUser);
  }, [auth.currentUser]);

  if (session)
    return (
      <div className="flex h-screen w-full flex-col sm:flex-row">
        <Navigation />
        <Dashboard>
          {/* component from content folder-> certain components with their functions handlig data etc*/}
          {/* there */}
          <button
            onClick={() => {
              signOut();
            }}
            className="text-lightBlue"
          >
            Logout
          </button>
        </Dashboard>
      </div>
    );

  return (
    <Container>
      <main className="flex h-screen items-center justify-center">
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
