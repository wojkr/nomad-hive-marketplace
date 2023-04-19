"use client";

import React from "react";
import Avatar from "../Avatar";
import Map from "../Map";
import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import ListingCategory, {
  LinstingCategoryProps,
} from "../listings/ListingCategory";

interface ListingInfoProps {
  user: SafeUser;
  category: LinstingCategoryProps | undefined;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  description: string;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  guestCount,
  roomCount,
  bathroomCount,
  description,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
                    text-xl 
                    font-semibold 
                    flex 
                    flex-row 
                    items-center
                    gap-2
                    "
        >
          {" "}
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    font-light
                    text-neutral
                    "
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr className="border-neutral" />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr className="border-neutral" />
      <div className="text-lg font-light text-neutral">{description}</div>
      <hr className="border-neutral" />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
