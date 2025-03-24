import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="flex justify-center items-center h-full bg-gray-800 ">
      <div className="relative">
        <FaSearch className=" absolute right-2 top-3 transform-translate-y-1/2 text-gray-300" />
        <input
          type="text"
          placeholder="Search movies"
          className="focus-outline-none  px-4 py-2 rounded border-none text-gray-100"
        />
      </div>
    </div>
  );
};

export default Search;
