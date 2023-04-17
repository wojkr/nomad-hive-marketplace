"use client";
import React from "react";
import { SafeUser, SafeListing } from "@/app/types/index";
import { Reservation } from "@prisma/client";

interface IListingClient {
  currentUser?: SafeUser | null;
  listing: SafeListing & {
    user: SafeUser;
  };
  reservation?: Reservation[];
}

const ListingClient: React.FC<IListingClient> = ({ currentUser, listing }) => {
  return <div>ListingClient</div>;
};

export default ListingClient;
