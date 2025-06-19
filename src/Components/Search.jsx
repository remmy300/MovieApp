import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import { Input } from "@mui/material";

const Search = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState("");
  const [debounceQuery] = useDebounce(inputValue, 500);
  useEffect(() => {
    setSearchTerm(debounceQuery);
  }, [debounceQuery, setSearchTerm]);
  return (
    <div className="flex justify-end items-end p-3 ">
      <div className="relative">
        <FaSearch
          size={20}
          className="  absolute right-2 top-3 transform-translate-y-1/2 "
        />
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search movies"
          className="focus:outline-none  p-1 rounded border md:text-2xl border-gray-500 text-gray-900"
        />
      </div>
    </div>
  );
};

export default Search;
