"use client";
import React, { useMemo } from "react";
import { SafeUser, SafeListing } from "@/app/types/index";
import { Reservation } from "@prisma/client";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

interface ListingClientProps {
  currentUser?: SafeUser | null;
  listing: SafeListing & {
    user: SafeUser;
  };
  reservation?: Reservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  currentUser,
  listing,
}) => {
  const category = useMemo(() => {
    return categories.find((c) => c.label === listing.category);
  }, [listing.category]);
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col gap-6">
        <ListingHead
          title={listing.title}
          imageSrc={listing.imageSrc}
          locationValue={listing.locationValue}
          id={listing.id}
          currentUser={currentUser}
        />
        <div
          className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
        >
          <ListingInfo
            user={listing.user}
            category={category}
            guestCount={listing.guestCount}
            roomCount={listing.roomCount}
            bathroomCount={listing.bathroomCount}
            description={listing.description}
            locationValue={listing.locationValue}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingClient;
