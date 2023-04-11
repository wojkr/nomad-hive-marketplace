"use client";

import React, { useState, useCallback } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";

import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../Input";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((cb) => {
      setIsLoading(false);

      if (cb?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }

      if (cb?.error) {
        toast.error(cb.error);
      }
    });
  };

  const bodyContent = (
    <div
      className="
      flex flex-col gap-4
      "
    >
      <Heading title="Welcome back" subtitle="Log in to your account" />
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
        Don't have an account?{" "}
        <span
          onClick={() => {
            loginModal.onClose();
            registerModal.onOpen();
          }}
          className="text-center text-dark cursor-pointer hover:underline"
        >
          Sign up
        </span>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default LoginModal;
