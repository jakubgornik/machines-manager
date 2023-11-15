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

  console.log(filterBy);

  return (
    <div className="fixed bottom-5 left-[50%] flex translate-x-[-50%]">
      <input
        className=" h-[50px] w-[180px] rounded-l-lg bg-lighterBlue px-4  text-sm text-gray-800  placeholder-gray-800 focus-within:border-lighterBlue focus:outline-none sm:w-[200px] "
        type="text"
        placeholder={`Filter by ${filterBy}...`}
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div
        onClick={passsSearchTerm}
        className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center self-end rounded-r-lg bg-lighterBlue text-white duration-300 hover:bg-opacity-80"
      >
        <FaSearch className="fill-gray-800" />
      </div>
    </div>
  );
};
