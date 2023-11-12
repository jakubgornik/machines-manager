import React from "react";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-screen max-h-full w-full overflow-y-auto bg-gray-800 px-[2rem] pt-8 sm:px-[3rem] sm:pt-24 lg:pt-28 ">
        <div className="mx-auto h-full  w-full max-w-[2880px] flex-wrap">
          <div className="flex w-full flex-col flex-wrap items-center gap-4 align-top sm:flex-row">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
