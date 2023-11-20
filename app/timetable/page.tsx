"use client";
import React from "react";
import Timetable from "../content/Timetable";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TimetablePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.replace("/");
  }
  return (
    <div className="h-screen w-full bg-white/70 dark:bg-gray-900">
      <Timetable />
    </div>
  );
};

export default TimetablePage;
