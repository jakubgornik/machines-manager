"use client";
import React from "react";
import { useState } from "react";
import { generateUniqueId } from "../utilities/generateUniqueId";
import { useRouter } from "next/navigation";

const ManageMachines = ({
  id,
  userId,
  onAdd,
  onDelete,
  onUpdate,
}: {
  id?: string;
  userId: string;
  onAdd?: (data: machineData) => Promise<void>;
  onDelete?: (userId: string, machineDataId: string) => Promise<void>;
  onUpdate?: (
    userId: string,
    machineDataId: string,
    newData: Partial<machineData>,
  ) => Promise<void>;
}) => {
  const router = useRouter();
  const [inputsData, setInputsData] = useState<machineData>({
    id: "",
    machineName: "",
    machineDesc: "",
    status: "Wolny",
    startDate: new Date(0),
    endDate: new Date(0),
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
    <div className="flex w-full flex-col items-center justify-center gap-2 bg-gray-800">
      <div className="float-label-input relative my-4 w-[60%] focus-within:font-semibold focus-within:text-lightBlue">
        <input
          name="machineName"
          type="text"
          id="machineName"
          placeholder=" "
          value={inputsData.machineName}
          onChange={handleInputChange}
          required
          className="focus:shadow-outline focus:border-mint w-full appearance-none border-b-2 border-lightBlue bg-slateGray px-2 py-3 leading-normal text-white  focus:outline-none"
        />
        <label
          htmlFor="machineName"
          className="pointer-events-none absolute -left-0 top-4 px-4 text-xs transition duration-200 ease-in-out sm:left-0 sm:top-3 sm:text-base"
        >
          Machine name
        </label>
      </div>
      <div className="float-label-input relative my-4 w-[60%] focus-within:font-semibold focus-within:text-lightBlue">
        <input
          name="machineDesc"
          type="text"
          id="machineDesc"
          placeholder=" "
          value={inputsData.machineDesc}
          onChange={handleInputChange}
          required
          className="focus:shadow-outline focus:border-mint w-full appearance-none border-b-2 border-lightBlue bg-slateGray px-2 py-3 leading-normal text-white  focus:outline-none"
        />
        <label
          htmlFor="machineDesc"
          className="pointer-events-none absolute -left-0 top-4 px-4 text-xs transition duration-200 ease-in-out sm:left-0 sm:top-3 sm:text-base"
        >
          Machine description
        </label>
      </div>
      <div className="flex w-[60%] flex-col justify-center gap-4 sm:flex-row sm:justify-end">
        {onDelete && (
          <button
            onClick={handleDelete}
            type="button"
            className="flex h-8 items-center  justify-center  rounded-sm border border-lightBlue px-4 text-xs font-medium text-white transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60  sm:text-base"
          >
            Delete
          </button>
        )}
        <button
          onClick={() => router.push("/")}
          type="button"
          className="flex h-8  items-center  justify-center rounded-sm border border-lightBlue px-4 text-xs font-medium text-white transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60 sm:text-base"
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
          className="flex h-8 items-center justify-center rounded-sm  border  border-lightBlue px-4 text-xs font-medium text-white transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60 disabled:border-slateGray disabled:bg-transparent disabled:text-slateGray sm:text-base"
        >
          {onAdd ? "Add" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default ManageMachines;
