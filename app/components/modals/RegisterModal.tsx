"use client";

import React, { useState, useCallback } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import { toast } from "react-hot-toast";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const handleSubmit = () => {
  return null;
};
const handleGoogleSubmit = () => {
  return null;
};

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered");
        registerModal.onClose();
        loginModal.onOpen();
        // signIn("credentials", { ...data, redirect: false });
        // router.refresh();
      })
      .catch((err) => toast.error("Something Went Wrong"))
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div
      className="
      flex flex-col gap-4
      "
    >
      <Heading title="Welcome to nomadHive" subtitle="Create an account" />
      {/* FORM */}
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div
      className="
      flex
      flex-col
      border-t-[1px]
      border-dark
      w-full
      gap-4
      p-6
      "
    >
      <Button
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
        outline
      />
      <Button
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
        outline
      />
      <div className="text-center text-dark/60">
        Already have an account?{" "}
        <span
          onClick={() => {
            registerModal.onClose();
            loginModal.onOpen();
          }}
          className="text-center text-dark cursor-pointer hover:underline"
        >
          Log in
        </span>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default RegisterModal;
