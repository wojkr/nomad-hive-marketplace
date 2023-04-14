"use client";

import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onSubtract = useCallback(() => {
    if (value > 1) onChange(value - 1);
  }, [onChange, value]);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <div className="text-dark">{title}</div>
          <div className="text-dark/50">{subtitle}</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div
            onClick={onSubtract}
            className="
            w-[1.8rem] 
            h-[1.8rem] 
            flex
            justify-center
            items-center 
            border-dark
            border-[1px] 
            rounded-full
            hover:opacity-60
            cursor-pointer
            transition
          "
          >
            <AiOutlineMinus />
          </div>
          <div className="w-[1rem] text-center">{value}</div>
          <div
            onClick={onAdd}
            className="
            w-[1.8rem] 
            h-[1.8rem] 
            flex
            justify-center
            items-center 
            border-dark
            border-[1px] 
            rounded-full
            hover:opacity-60
            cursor-pointer
            transition
          "
          >
            <AiOutlinePlus />
          </div>
        </div>
      </div>
    </>
  );
};

export default Counter;
