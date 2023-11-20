"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ManageMachinesStatus = ({
  id,
  userId,
  onUpdate,
}: {
  id?: string;
  userId: string;
  onUpdate?: (
    userId: string,
    machineDataId: string,
    newData: Partial<machineData>,
  ) => Promise<void>;
}) => {
  const router = useRouter();
  const [inputsData, setInputsData] = useState<Partial<machineData>>({
    status: "Wolny",
    startDate: "",
    endDate: "",
    owner: "",
    ownerMail: "",
    pricePerHour: 0,
    ownerLocalization: "",
  });

  const handleUpdate = () => {
    if (onUpdate && id) {
      onUpdate(userId, id, inputsData);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputsData({
      ...inputsData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectInputChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setInputsData({
      ...inputsData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 pb-6 dark:bg-gray-800 sm:gap-2">
      <div className="float-label-input relative my-4 w-[90%] text-xs focus-within:font-semibold focus-within:text-gray-900 dark:focus-within:text-lightBlue sm:w-[60%] sm:text-base">
        <input
          name="owner"
          type="text"
          id="owner"
          placeholder=" "
          value={inputsData.owner}
          onChange={handleInputChange}
          required
          className="focus:shadow-outline w-full appearance-none border-b-2 border-gray-900 bg-white/70 px-2 py-3 leading-normal text-gray-800 focus:outline-none dark:border-lightBlue"
        />
        <label
          htmlFor="owner"
          className="pointer-events-none absolute -left-0 top-4 px-4  transition duration-200 ease-in-out sm:left-0 sm:top-3 "
        >
          Client
        </label>
      </div>
      <div className="float-label-input relative my-4 w-[90%] text-xs focus-within:font-semibold focus-within:text-gray-900 dark:focus-within:text-lightBlue sm:w-[60%] sm:text-base">
        <input
          name="ownerMail"
          type="text"
          id="ownerMail"
          placeholder=" "
          value={inputsData.ownerMail}
          onChange={handleInputChange}
          required
          className="focus:shadow-outline w-full appearance-none border-b-2 border-gray-900 bg-white/70 px-2 py-3 leading-normal text-gray-800 focus:outline-none dark:border-lightBlue"
        />
        <label
          htmlFor="ownerMail"
          className="pointer-events-none absolute -left-0 top-4 px-4 transition duration-200 ease-in-out sm:left-0 sm:top-3 "
        >
          Client mail
        </label>
      </div>

      <div className="float-label-input relative my-4 w-[90%] text-xs focus-within:font-semibold focus-within:text-gray-900 dark:focus-within:text-lightBlue sm:w-[60%] sm:text-base">
        <input
          name="ownerLocalization"
          type="text"
          id="ownerLocalization"
          placeholder=" "
          value={inputsData.ownerLocalization}
          onChange={handleInputChange}
          required
          className="focus:shadow-outline w-full appearance-none border-b-2 border-gray-900 bg-white/70 px-2 py-3 leading-normal text-gray-800 focus:outline-none dark:border-lightBlue"
        />
        <label
          htmlFor="ownerLocalization"
          className="pointer-events-none absolute -left-0 top-4 px-4  transition duration-200 ease-in-out sm:left-0 sm:top-3 "
        >
          Client localization
        </label>
      </div>
      <div className="relative my-4 w-[90%] text-xs font-semibold text-gray-900 focus-within:text-gray-900 dark:text-lightBlue dark:focus-within:text-lightBlue sm:w-[60%] sm:text-base">
        <select
          name="status"
          id="status"
          onChange={handleSelectInputChange}
          className="focus:shadow-outline w-full appearance-none border-b-2 border-gray-900 bg-white/70 px-2 py-3 font-normal leading-normal text-gray-800 focus:outline-none dark:border-lightBlue"
        >
          <option value="Wolne">Wolne</option>
          <option value="Wynajmowane">Wynajmowane</option>
          <option value="Serwisowane">Serwisowane</option>
        </select>
        <label
          htmlFor="status"
          className="pointer-events-none absolute -left-4 -top-5 px-4  transition duration-200 ease-in-out sm:-left-4 sm:-top-6"
        >
          Status
        </label>
      </div>
      <div className="float-label-input relative my-4 w-[90%] text-xs font-semibold text-gray-900 dark:text-lightBlue sm:w-[60%] sm:text-base">
        <input
          name="pricePerHour"
          type="number"
          id="pricePerHour"
          placeholder=" "
          value={inputsData.pricePerHour}
          onChange={handleInputChange}
          required
          className="focus:shadow-outline w-full appearance-none border-b-2 border-gray-900 bg-white/70 px-2 py-3 font-normal leading-normal text-gray-800 focus:outline-none dark:border-lightBlue"
        />
        <label
          htmlFor="pricePerHour"
          className="pointer-events-none absolute -left-0 top-4 px-4  transition duration-200 ease-in-out sm:left-0 sm:top-3 "
        >
          Price per hour[zł]
        </label>
      </div>
      <div className="float-label-input relative my-4 w-[90%] text-xs font-semibold text-gray-900 dark:text-lightBlue sm:w-[60%] sm:text-base">
        <input
          name="startDate"
          type="datetime-local"
          id="startDate"
          placeholder=" "
          onChange={handleInputChange}
          required
          className="focus:shadow-outline w-full appearance-none border-b-2 border-gray-900 bg-white/70 px-2 py-3 font-normal leading-normal text-gray-800 focus:outline-none dark:border-lightBlue"
        />
        <label
          htmlFor="startDate"
          className="pointer-events-none absolute -left-0 top-4 px-4  transition duration-200 ease-in-out sm:left-0 sm:top-3 "
        >
          Start date
        </label>
      </div>
      <div className="float-label-input relative my-4 w-[90%] text-xs font-semibold text-gray-900 dark:text-lightBlue sm:w-[60%] sm:text-base">
        <input
          name="endDate"
          type="datetime-local"
          id="endDate"
          placeholder=" "
          onChange={handleInputChange}
          required
          className="focus:shadow-outline w-full appearance-none border-b-2 border-gray-900 bg-white/70 px-2 py-3 font-normal leading-normal text-gray-800 focus:outline-none dark:border-lightBlue"
        />
        <label
          htmlFor="endDate"
          className="pointer-events-none absolute -left-0 top-4 px-4  transition duration-200 ease-in-out sm:left-0 sm:top-3 "
        >
          End date
        </label>
      </div>
      <div className="flex w-[90%] flex-col justify-center gap-4 sm:w-[60%] sm:flex-row sm:justify-end">
        <button
          onClick={() => router.back()}
          type="button"
          className="flex h-8 items-center justify-center rounded-sm border border-gray-900 px-4 text-xs font-medium text-white transition-all duration-300 hover:bg-gray-900 hover:bg-opacity-60 dark:border-lightBlue dark:hover:bg-lightBlue sm:text-base"
        >
          Cancel
        </button>
        <button
          disabled={
            inputsData.owner?.length === 0 ||
            inputsData.ownerLocalization?.length === 0 ||
            inputsData.ownerMail?.length === 0 ||
            inputsData.status?.length === 0 ||
            inputsData.pricePerHour === 0 ||
            !inputsData.startDate ||
            !inputsData.endDate
          }
          onClick={handleUpdate}
          type="button"
          className="flex h-8 items-center justify-center rounded-sm border border-gray-900 px-4 text-xs font-medium text-white transition-all duration-300 hover:bg-gray-900 hover:bg-opacity-60 disabled:border-gray-500 disabled:text-gray-500 disabled:hover:bg-transparent dark:border-lightBlue dark:hover:bg-lightBlue dark:disabled:hover:bg-transparent sm:text-base"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ManageMachinesStatus;
