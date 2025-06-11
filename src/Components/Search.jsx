import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";

const Search = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState("");
  const [debounceQuery] = useDebounce(inputValue, 500);
  useEffect(() => {
    setSearchTerm(debounceQuery);
  }, [debounceQuery, setSearchTerm]);
  return (
    <div className="flex justify-center items-center h-full bg-gray-800 ">
      <div className="relative">
        <FaSearch className=" absolute right-2 top-3 transform-translate-y-1/2 text-gray-300" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search movies"
          className="focus:outline-none  px-4 py-2 rounded border md:text-2xl border-gray-300 text-gray-100"
        />
      </div>
    </div>
  );
};

export default Search;
