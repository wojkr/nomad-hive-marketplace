"use client";

import React, { useState, useCallback } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

import useRegisterModal from "../modals/Modal";
import Button from "../Button";

type FormValues = {
  email: string;
  name: string;
  password: string;
};

const handleSubmit = () => {
  return null;
};
const handleGoogleSubmit = () => {
  return null;
};

const RegisterModal = () => {
  const [showModal, setShowModal] = useState(true);
  const isOpen = true;
  const title = "Register";
  const subtitle = "Create an account";
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div
        className="
      justify-center
      items-center
      flex
      overflow-x-hidden
      overflow-y-auto
      fixed
      inset-0
      z-50
      outline-none
      focus:outline-none
      bg-dark/80
      "
      >
        <div
          className="
        relative
        w-full
        md:w-4/6
        lg:w-3/6
        xl:w-2/5
        my-6
        mx-auto
        h-full
        lg:h-auto
        md:h-auto
        "
        >
          {/* CONTENT */}
          <div
            className={`
          translate
          duration-300
          h-full
          ${showModal ? "translate-y-0" : "translate-y-full"}
          ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div
              className="
            translate
            h-full
            lg:h-auto
            md:h-auto
            border-0
            rounded-lg
            shadow-lg
            relative
            flex
            flex-col
            w-full
            bg-light
            text-dark
            outline-none
            focus:outline-none
            "
            >
              {/* HEADER */}
              <div
                className="
                flex
                items-center
                p-6    
                rounded-t
                justify-center
                relative
                border-b-[1px]
                border-dark
                "
              >
                <button
                  className="
                p-1
                border-0
                hover:opacity-70
                transition
                absolute
                left-9
                "
                >
                  <IoMdClose size={18} />
                </button>
                <div
                  className="
                text-lg font-semibold"
                >
                  {title}
                </div>
              </div>
              {/* BODY */}
              <div
                className="
              relative 
              p-6
              pb-0
              flex-auto
              "
              >
                <p className="text-2xl font-bold">Welcome to nomadHive</p>
                <p className="text-dark/60">{subtitle}</p>
                {/* FORM */}
                <form
                  className="flex flex-col gap-4 mt-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    className="border-dark/60 border-[1px] rounded-md bg-light p-3 placeholder:text-dark/60 w-full"
                    placeholder="Email"
                    type="email"
                    {...register("email")}
                  />
                  <input
                    className="border-dark/60 border-[1px] rounded-md bg-light p-3 placeholder:text-dark/60 w-full"
                    placeholder="Name"
                    {...register("name")}
                  />
                  <input
                    className="border-dark/60 border-[1px] rounded-md bg-light p-3 placeholder:text-dark/60 w-full "
                    placeholder="Password"
                    type="password"
                    {...register("password")}
                  />
                  <Button label="Continue" onClick={handleSubmit(onSubmit)} />
                </form>
              </div>
              {/* FOOTER */}
              <div
                className="
                p-6"
              >
                <div
                  className="
                flex
                flex-col
                border-t-[1px]
                border-dark/40
                w-full
                gap-4
                pt-6
                "
                >
                  <Button
                    label="Continue with Google"
                    icon={FcGoogle}
                    onClick={handleGoogleSubmit}
                    outline
                  />
                  <Button
                    label="Continue with Github"
                    icon={AiFillGithub}
                    onClick={handleGoogleSubmit}
                    outline
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
