import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

const Search = () => {
  return (
    <div className="control has-icons-left">
      <input
        className="input is-small py-4 has-background-white-ter"
        type="text"
        placeholder="Search"
      />
      <span className="icon is-small is-left">
        <SearchIcon className="icon is-small py-1" />
      </span>
    </div>
  );
};

export default Search;
