import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const Search = ({
  filterBy,
  onSearchChange,
}: {
  filterBy: string;
  onSearchChange: (searchTerm: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const passsSearchTerm = () => {
    onSearchChange(searchTerm);
  };

  return (
    <div className="animate-search fixed bottom-5 left-[50%] flex shrink translate-x-[-50%] px-[1rem] sm:ml-[32px]">
      <input
        className="h-[50px] rounded-l-lg bg-white/80 pl-2 text-sm font-medium text-gray-900 placeholder-gray-900 focus:outline-none dark:bg-lighterBlue/80 sm:w-[200px] "
        type="text"
        placeholder={`Filter by ${filterBy}`}
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div
        onClick={passsSearchTerm}
        className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center self-end rounded-r-lg bg-gray-400 text-white dark:bg-gray-900/50"
      >
        <FaSearch className="fill-gray-900 dark:fill-lighterBlue" />
      </div>
    </div>
  );
};
