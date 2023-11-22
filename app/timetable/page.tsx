"use client";
import React from "react";
import Timetable from "../content/Timetable";
import { useSession } from "next-auth/react";

const TimetablePage = () => {
  const { data: session } = useSession();

  if (session)
    return (
      <div className="h-[100dvh] w-full bg-white/70 dark:bg-gray-900">
        <Timetable />
      </div>
    );
};

export default TimetablePage;
