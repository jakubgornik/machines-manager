"use client";
import { signOut, useSession } from "next-auth/react";

const Home = () => {
  const session = useSession();
  return (
    <>
      <div>{session?.data?.user?.name}</div>
      <button onClick={() => signOut()}>Logout</button>
    </>
  );
};

export default Home;
