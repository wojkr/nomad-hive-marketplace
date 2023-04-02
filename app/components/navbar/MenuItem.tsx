"use client";

import React from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      className="
  px-4
  py-3 
  hover:bg-accentDark
  hover:text-white
  font-semibold
  transition duration-300
  "
    >
      {label}
    </div>
  );
};

export default MenuItem;
