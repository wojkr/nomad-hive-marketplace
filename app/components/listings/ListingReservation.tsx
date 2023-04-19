"use client";

import React from "react";
import { Range } from "react-date-range";
import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface IListingReservation {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<IListingReservation> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div
      className="
                bg-white
                rounded-xl 
                border-[1px]
                border-neutral 
                overflow-hidden
                "
    >
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">£ {price}</div>
        <div className="font-light text-neutral">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div
        className="
                p-4 
                flex 
                flex-row 
                items-center 
                justify-between
                font-semibold
                text-lg
                "
      >
        <div>Total</div>
        <div>£ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
