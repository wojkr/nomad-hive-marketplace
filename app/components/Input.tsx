"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiPound } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && <BiPound size={24} className="absolute top-5 left-2" />}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={`
          peer 
          border-2 rounded-md outline-none 
          bg-light p-4 pt-6 w-full
          font-light 
          transition disabled:opacity-70 disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-dark/60"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-dark"}

`}
      />
      <label
        className={`
       absolute
       text-md
       text-dark/60
       duration-150
       transform
       -translate-y-3
       top-5
       z-10
       origin-[0]
       ${formatPrice ? "left-9" : "left-4"}
       peer-placeholder-shown:scale-100
       peer-placeholder-shown:translate-y-0
       peer-focus:scale-75
       peer-focus:-translate-y-4
       `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
