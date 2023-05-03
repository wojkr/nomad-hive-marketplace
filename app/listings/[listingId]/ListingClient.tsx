"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SafeUser, SafeListing, SafeReservation } from "@/app/types/index";
import { Reservation } from "@prisma/client";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "../../hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import axios from "axios";
import ListingReservation from "@/app/components/listings/ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  currentUser?: SafeUser | null;
  listing: SafeListing & {
    user: SafeUser;
  };
  reservations?: SafeReservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  currentUser,
  reservations = [],
  listing,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((r: any) => {
      const range = eachDayOfInterval({
        start: new Date(r.startDate),
        end: new Date(r.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((c) => c.label === listing.category);
  }, [listing.category]);

  //createReservation-> create res with toast and redirect to /trips when success Block incoming reqs when this func is triggered
  //set total price when dateRange changes
  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        // userId: currentUser.id,
        listingId: listing.id,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalPrice: totalPrice,
        // createdAt: Date.now(),
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch((e) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, totalPrice, dateRange, listing.id, loginModal, router]);

  useEffect(() => {
    let daysCount = 0;
    if (dateRange.startDate && dateRange.endDate) {
      daysCount = differenceInDays(dateRange.endDate, dateRange.startDate);
    }
    if (daysCount && listing.price) {
      setTotalPrice(listing.price * daysCount);
    } else {
      setTotalPrice(listing.price);
    }
  }, [dateRange, listing.price]);

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
          <div
            className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
          >
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingClient;
