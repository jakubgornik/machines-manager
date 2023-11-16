import React from "react";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import { useGetUserId } from "../hooks/useGetUserId";
import MailTo from "../components/svg/MailTo";

type uniqueEmail = {
  email: string;
  owner: string;
  ownerLocalization: string;
};

const MailsBoardPanel = () => {
  const userId = useGetUserId();
  const userMachines = useGetUserMachines(userId).filter((machine) => {
    return machine !== null;
  });

  const machinesWithEmail: machineData[] = userMachines.filter(
    (machine) =>
      machine && machine.ownerMail !== undefined && machine.ownerMail !== "",
  );

  const uniqueEmails = userMachines.reduce((acc: uniqueEmail[], machine) => {
    if (
      machine &&
      machine.ownerMail &&
      machine.owner &&
      machine.ownerLocalization
    ) {
      const isThatEmailUnique = acc.find(
        (el) => el.email === machine.ownerMail,
      );
      if (!isThatEmailUnique) {
        acc.push({
          email: machine.ownerMail,
          owner: machine.owner,
          ownerLocalization: machine.ownerLocalization,
        });
      }
    }
    return acc;
  }, []);

  return (
    <>
      <div className="sm:text mb-4 w-full text-[0.5rem] sm:text-[0.8rem] lg:text-base">
        {uniqueEmails.length !== 0 ? (
          <span className=" text-lg font-semibold text-lighterBlue md:text-xl">
            / Unique customers
          </span>
        ) : null}
        <div className="bg-gray-900 duration-300  hover:bg-opacity-70">
          {uniqueEmails.map((el) => (
            <div
              key={el.email}
              className="flex border-b-2 border-gray-800 px-2 py-2 duration-300 hover:bg-slate-800 hover:bg-opacity-50"
            >
              <div className="flex w-[25%] flex-col gap-2 pr-1">
                <span className="font-semibold text-lighterBlue">
                  Client email
                </span>
                <span className="break-all text-white">{el.email}</span>
              </div>

              <div className="flex w-[25%] flex-col gap-2 pr-1">
                <span className="font-semibold text-lighterBlue">Client</span>
                <span className="break-all  text-white">{el.owner}</span>
              </div>

              <div className="flex w-[25%] flex-col gap-2 pr-1">
                <span className="font-semibold text-lighterBlue">
                  Localization
                </span>
                <span className="break-all  text-white ">
                  {el.ownerLocalization}
                </span>
              </div>
              <div className="flex w-[25%] items-center justify-center">
                <MailTo email={el.email} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sm:text mb-8 mt-12 w-full text-[0.5rem] sm:text-[0.8rem] lg:text-base">
        {machinesWithEmail.length !== 0 ? (
          <span className=" text-lg font-semibold text-lighterBlue md:text-xl">
            / Customers and machines
          </span>
        ) : null}
        <div className="bg-gray-900 duration-300  hover:bg-opacity-70">
          {machinesWithEmail.map((el) => (
            <div
              key={el.id}
              className="flex border-b-2 border-gray-800 px-2 py-2 duration-300 hover:bg-slate-800 hover:bg-opacity-50"
            >
              <div className="flex w-[20%] flex-col gap-2 pr-1">
                <span className="font-semibold text-lighterBlue">
                  Machine name
                </span>
                <span className="break-all text-white">{el.machineName}</span>
              </div>

              <div className="flex w-[20%] flex-col gap-2 pr-1">
                <span className="font-semibold text-lighterBlue">Client</span>
                <span className="break-all  text-white">{el.owner}</span>
              </div>

              <div className="flex w-[20%] flex-col gap-2 pr-1">
                <span className="font-semibold text-lighterBlue">
                  Client email
                </span>
                <span className="break-all text-white">{el.ownerMail}</span>
              </div>

              <div className="flex w-[20%] flex-col gap-2 pr-1">
                <span className="font-semibold text-lighterBlue">
                  Localization
                </span>
                <span className="break-all  text-white ">
                  {el.ownerLocalization}
                </span>
              </div>
              <div className="flex w-[20%] items-center justify-center">
                <MailTo email={el.ownerMail} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MailsBoardPanel;
