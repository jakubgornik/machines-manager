import React from "react";

const Dashboard = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <>
      <div className="h-screen max-h-full w-full overflow-y-auto bg-gray-800 px-[1rem] pt-8 sm:px-[3rem]">
        <div className="mx-auto h-full w-full max-w-[2880px] flex-wrap">
          <span className="mb-3 flex justify-center bg-gradient-to-l from-lighterBlue to-lightBlue bg-clip-text text-center text-4xl font-extrabold uppercase text-transparent sm:mb-12">
            {title}
          </span>

          <div className="flex w-full flex-col flex-wrap items-center gap-4 align-top sm:flex-row">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
