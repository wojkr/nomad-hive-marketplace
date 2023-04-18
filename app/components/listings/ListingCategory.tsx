"use client";

import React from "react";
import { IconType } from "react-icons/lib";

export interface LinstingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const ListingCategory: React.FC<LinstingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-dark/50" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-dark/50 font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
