import React from "react";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import { useSession } from "next-auth/react";
import MailTo from "../components/svg/MailTo";
import { MachineData } from "@/types";

type UniqueEmail = {
  email: string;
  owner: string;
  ownerLocalization: string;
};

const MailsBoardPanel = () => {
  const { data: session } = useSession();

  const userId = session?.user?.id;
  const userMachines = useGetUserMachines(userId).filter(
    (machine) => machine !== null,
  );

  const machinesWithEmail: MachineData[] = userMachines.filter(
    (machine) =>
      machine && machine.ownerMail !== undefined && machine.ownerMail !== "",
  );

  const uniqueEmails = userMachines.reduce((acc: UniqueEmail[], machine) => {
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

  if (session)
    return (
      <>
        <div className="sm:text mb-4 w-full text-[0.5rem] sm:text-[0.8rem] lg:text-base">
          {uniqueEmails.length !== 0 ? (
            <span className="text-lg font-semibold text-gray-900 dark:text-lighterBlue md:text-xl">
              / Unique customers
            </span>
          ) : null}
          <div className="mt-4 bg-white/70 duration-300 hover:bg-white/50 dark:bg-gray-900 dark:hover:bg-opacity-70">
            {uniqueEmails.map((el) => (
              <div
                key={el.email}
                className="flex border-b border-gray-800 px-2 py-2 duration-300 hover:bg-gray-400 hover:bg-opacity-50 dark:border-b-2  dark:hover:bg-slate-800 dark:hover:bg-opacity-50"
              >
                <div className="flex w-[25%] flex-col gap-2 pr-1">
                  <span className="font-semibold text-gray-900 dark:text-lighterBlue">
                    Client email
                  </span>
                  <span className="break-all text-gray-800 dark:text-white">
                    {el.email}
                  </span>
                </div>

                <div className="flex w-[25%] flex-col gap-2 pr-1">
                  <span className="font-semibold text-gray-900 dark:text-lighterBlue">
                    Client
                  </span>
                  <span className="break-all text-gray-800 dark:text-white">
                    {el.owner}
                  </span>
                </div>

                <div className="flex w-[25%] flex-col gap-2 pr-1">
                  <span className="font-semibold text-gray-900 dark:text-lighterBlue">
                    Localization
                  </span>
                  <span className="break-all text-gray-800 dark:text-white">
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
            <span className="text-lg font-semibold text-gray-900 dark:text-lighterBlue md:text-xl">
              / Customers and machines
            </span>
          ) : null}
          <div className="mt-4 bg-white/70 duration-300 hover:bg-white/50 dark:bg-gray-900 dark:hover:bg-opacity-70">
            {machinesWithEmail.map((el) => (
              <div
                key={el.id}
                className="flex border-b border-gray-800 px-2 py-2 duration-300 hover:bg-gray-400 hover:bg-opacity-50 dark:border-b-2  dark:hover:bg-slate-800 dark:hover:bg-opacity-50"
              >
                <div className="flex w-[20%] flex-col gap-2 pr-1">
                  <span className="font-semibold text-gray-900 dark:text-lighterBlue">
                    Machine name
                  </span>
                  <span className="break-all text-gray-800 dark:text-white">
                    {el.machineName}
                  </span>
                </div>

                <div className="flex w-[20%] flex-col gap-2 pr-1">
                  <span className="font-semibold text-gray-900 dark:text-lighterBlue">
                    Client
                  </span>
                  <span className="break-all text-gray-800 dark:text-white">
                    {el.owner}
                  </span>
                </div>

                <div className="flex w-[20%] flex-col gap-2 pr-1">
                  <span className="font-semibold text-gray-900 dark:text-lighterBlue">
                    Client email
                  </span>
                  <span className="break-all text-gray-800 dark:text-white">
                    {el.ownerMail}
                  </span>
                </div>

                <div className="flex w-[20%] flex-col gap-2 pr-1">
                  <span className="font-semibold text-gray-900 dark:text-lighterBlue">
                    Localization
                  </span>
                  <span className="break-all text-gray-800 dark:text-white">
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
