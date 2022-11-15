import { useRouter } from "next/router";
import { ReactElement, useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import SearchInput from "./SearchInput";

const Search = () => {
  return (
    <div className="search-page p-5">
      <div>
        <h1 className="text-5xl font-semibold">Lalalala</h1>
      </div>
      <div className="search-container">
        <SearchInput />
      </div>
    </div>
  );
};

export default Search;
