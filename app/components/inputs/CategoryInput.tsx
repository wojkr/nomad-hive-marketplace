"use client";

import React from "react";
import { IconType } from "react-icons/lib";

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  selected,
  label,
  icon: Icon,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
  rounded-xl 
  border-2
  p-4
  flex
  flex-col
  gap-3
  hover:border-dark
  transition
  cursor-pointer
  ${selected ? "border-dark" : "border-dark/40"}`}
    >
      <Icon size={30} />
      <div className="">{label}</div>
    </div>
  );
};

export default CategoryInput;
