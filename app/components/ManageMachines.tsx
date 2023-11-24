"use client";
import React from "react";
import { useState } from "react";
import { generateUniqueId } from "../utilities/generateUniqueId";
import { useRouter } from "next/navigation";
import { MachineData } from "@/types";

const ManageMachines = ({
  id,
  userId,
  onAdd,
  onDelete,
  onUpdate,
}: {
  id?: string;
  userId: string;
  onAdd?: (data: MachineData) => Promise<void>;
  onDelete?: (userId: string, machineDataId: string) => Promise<void>;
  onUpdate?: (
    userId: string,
    machineDataId: string,
    newData: Partial<MachineData>,
  ) => Promise<void>;
}) => {
  const router = useRouter();
  const [inputsData, setInputsData] = useState<MachineData>({
    id: "",
    machineName: "",
    machineDesc: "",
    status: "Available",
    startDate: "",
    endDate: "",
    owner: "",
    ownerMail: "",
    pricePerHour: 0,
    ownerLocalization: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputsData({
      ...inputsData,
      id: generateUniqueId(),
      [event.target.name]: event.target.value,
    });
  };

  const handleAddnewMachine = () => {
    if (onAdd) {
      onAdd(inputsData);
    }
  };

  const handleDelete = () => {
    if (onDelete && id) {
      onDelete(userId, id);
    }
  };

  const handleUpdate = () => {
    if (onUpdate && id) {
      onUpdate(userId, id, inputsData);
    }
  };

  return (
    <div className=" flex w-full flex-col items-center justify-center gap-1 dark:bg-gray-800 sm:gap-2">
      <div className="float-label-input relative my-4 w-[90%] text-xs focus-within:font-semibold focus-within:text-gray-900 dark:focus-within:text-lightBlue sm:w-[60%] sm:text-base">
        <input
          name="machineName"
          type="text"
          id="machineName"
          placeholder=" "
          value={inputsData.machineName}
          onChange={handleInputChange}
          required
          className="focus:shadow-outline focus:border-mint w-full appearance-none border-b-2 border-gray-900 bg-white/70 px-2 py-3 leading-normal text-gray-800 focus:outline-none dark:border-lightBlue"
        />
        <label
          htmlFor="machineName"
          className="pointer-events-none absolute -left-0 top-4 px-4  transition duration-200 ease-in-out sm:left-0 sm:top-3 "
        >
          Machine name
        </label>
      </div>
      <div className="float-label-input relative my-4 w-[90%] text-xs focus-within:font-semibold focus-within:text-gray-900 dark:focus-within:text-lightBlue sm:w-[60%] sm:text-base">
        <input
          name="machineDesc"
          type="text"
          id="machineDesc"
          placeholder=" "
          value={inputsData.machineDesc}
          onChange={handleInputChange}
          required
          className="focus:shadow-outline w-full appearance-none border-b-2 border-gray-900 bg-white/70 px-2 py-3 leading-normal text-gray-800 focus:outline-none dark:border-lightBlue"
        />
        <label
          htmlFor="machineDesc"
          className="pointer-events-none absolute -left-0 top-4 px-4 transition duration-200 ease-in-out sm:left-0 sm:top-3 "
        >
          Machine description
        </label>
      </div>
      <div className="flex w-[90%] flex-col justify-center gap-4 sm:w-[60%] sm:flex-row sm:justify-end">
        {onDelete && (
          <button
            onClick={handleDelete}
            type="button"
            className="flex h-8 items-center justify-center rounded-sm border border-gray-900 px-4 text-xs font-medium text-white transition-all duration-300 hover:bg-gray-900 hover:bg-opacity-60 dark:border-lightBlue dark:hover:bg-lightBlue sm:text-base"
          >
            Delete
          </button>
        )}
        <button
          onClick={() => router.push("/")}
          type="button"
          className="flex h-8 items-center justify-center rounded-sm border border-gray-900 px-4 text-xs font-medium text-white transition-all duration-300 hover:bg-gray-900 hover:bg-opacity-60 dark:border-lightBlue dark:hover:bg-lightBlue sm:text-base"
        >
          Cancel
        </button>
        <button
          disabled={
            inputsData.machineName.length === 0 ||
            inputsData.machineDesc.length === 0
          }
          onClick={onAdd ? handleAddnewMachine : handleUpdate}
          type="button"
          className="flex h-8 items-center justify-center rounded-sm border border-gray-900 px-4 text-xs font-medium text-white transition-all duration-300 hover:bg-gray-900 hover:bg-opacity-60 disabled:border-gray-500 disabled:text-gray-500 disabled:hover:bg-transparent dark:border-lightBlue dark:hover:bg-lightBlue dark:disabled:hover:bg-transparent sm:text-base"
        >
          {onAdd ? "Add" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default ManageMachines;
