"use client";
import React from "react";
import { DotLoader } from "react-spinners";
const Loader = () => {
  return (
    <div
      className="
        h-[70vh]
        flex
        flex-col
        justify-center
        items-center
        "
    >
      <DotLoader size={100} color="#333544" />
    </div>
  );
};

export default Loader;
