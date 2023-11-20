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
        className="h-screen max-h-full w-full overflow-y-auto bg-gray-800 px-[1rem] pt-8 print:overflow-y-visible sm:px-[3rem]"
      >
        <div className="mx-auto h-full w-full max-w-[2880px] ">
          <span className="mb-3 flex justify-center bg-gradient-to-l from-lighterBlue to-lightBlue bg-clip-text text-center text-4xl font-extrabold uppercase text-transparent print:hidden sm:mb-12">
            {title}
          </span>
          <div className="fixed right-5 top-10 hidden sm:flex">
            <button
              onClick={() => {
                signOut();
              }}
              type="button"
              className="flex items-center justify-center rounded-sm border border-lightBlue px-3 py-2  text-xs font-medium text-white transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60 sm:text-sm"
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
