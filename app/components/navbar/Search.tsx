"use client";

import { BiSearch } from "react-icons/bi";
import Box from "../Box";

const Search = () => {
  return (
    <Box>
      <div
        className="
        flex
        flex-row
        items-center
        justify-between"
      >
        <div
          className="
        text-sm 
        font-semibold
        px-6
        hover:text-accentDark     
        transition 
        duration-300
        "
        >
          Anywhere
        </div>
        <div
          className="
        hidden 
        sm:block
        text-sm
        font-semibold
        border-dark
        px-6
        border-x-[1px]
        flex-1
        text-center
        hover:text-accentDark
        transition 
        duration-300
         "
        >
          Any Week
        </div>
        <div
          className="
        text-sm
        pl-6
        pr-2
        flex
        flex-row
        items-center
        gap-3
        "
        >
          <div className="hidden sm:block         hover:text-accentDark">
            Add Guests
          </div>
          <div
            className="
           p-2
           bg-dark
           rounded-full
           text-white
           hover:bg-accentDark
           transition 
           duration-300
           
           "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Search;
