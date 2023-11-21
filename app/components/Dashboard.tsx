import React from "react";
import { signOut } from "next-auth/react";

const Dashboard = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <>
      <div
        id="wrapper"
        className="h-screen max-h-full w-full overflow-y-auto bg-white/50 px-[1rem] pt-8 dark:bg-gray-800 print:overflow-y-visible sm:px-[3rem]"
      >
        <div className="mx-auto h-full w-full max-w-[2880px] ">
          <span className="mb-3 flex justify-center bg-gradient-to-l from-gray-600 to-gray-900 bg-clip-text text-center text-4xl font-extrabold uppercase text-transparent dark:from-lighterBlue dark:to-lightBlue print:hidden sm:mb-12">
            {title}
          </span>
          <div className="fixed right-5 top-10 hidden sm:flex">
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              type="button"
              className="flex items-center justify-center rounded-sm border border-gray-900 px-3 py-2 text-xs font-medium text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:bg-opacity-60   hover:text-white dark:border-lightBlue dark:text-white dark:hover:bg-lightBlue print:hidden  sm:text-sm"
            >
              Logout
            </button>
          </div>
          <div className="flex w-full flex-col flex-wrap items-center justify-center gap-4 pb-20 align-top sm:flex-row">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
