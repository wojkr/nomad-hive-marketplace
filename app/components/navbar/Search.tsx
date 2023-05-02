"use client";

import { BiSearch } from "react-icons/bi";
import Box from "../Box";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();
  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationText = useMemo(() => {
    if (locationValue) return getByValue(locationValue)?.label;
    return "Anywhere";
  }, [locationValue, getByValue]);

  const dateText = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const difference = differenceInDays(end, start);
      if (difference === 0) return "1 Day";
      return `${difference} Days`;
    }
    return "Any Week";
  }, [startDate, endDate]);
  const guestText = useMemo(() => {
    if (guestCount) {
      return Number(guestCount) === 1 ? `1 Guest` : `${guestCount} Guests`;
    }
    return "Add Guests";
  }, [guestCount]);

  return (
    <Box>
      <div
        onClick={searchModal.onOpen}
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
          {locationText}
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
          {dateText}
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
            {guestText}
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
