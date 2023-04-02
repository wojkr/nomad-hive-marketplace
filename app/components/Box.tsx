import React from "react";
interface BoxProps {
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ children }) => {
  return (
    <div
      className="
      border-[1px]
      border-dark
      w-full 
      md:w-auto
      p-2
      rounded-full
      shadow-sm
      hover:shadow-md
      cursor-pointer
      transition 
    duration-200
"
    >
      {children}
    </div>
  );
};

export default Box;
