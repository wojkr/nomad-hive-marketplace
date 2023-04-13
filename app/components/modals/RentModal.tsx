"use client";

import React, { useState, useCallback, useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import useRentModal from "@/app/hooks/useRentModal";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  //   const [isLoading, setIsLoading] = useState(false);
  //   const loginModal = useLoginModal();
  //   const registerModal = useRegisterModal();
  //   const router = useRouter();

  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const onBack = () => setStep((prev) => prev - 1);
  const onNext = () => setStep((prev) => prev + 1);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";
    return "Next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Back";
  }, [step]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guessCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });
  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true, //user has made changes to a form input field
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  //   const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //     setIsLoading(true);
  //     signIn("credentials", {
  //       ...data,
  //       redirect: false,
  //     }).then((cb) => {
  //       setIsLoading(false);

  //       if (cb?.ok) {
  //         toast.success("Logged in");
  //         router.refresh();
  //         loginModal.onClose();
  //       }

  //       if (cb?.error) {
  //         toast.error(cb.error);
  //       }
  //     });
  //   };

  let bodyContent = (
    <div
      className="
        flex flex-col gap-8
        "
    >
      <Heading
        title="Which of these describes your place best?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((c) => (
          <div key={c.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === c.label}
              label={c.label}
              icon={c.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
  {
    /* FORM */
  }
  {
    /* <Input
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
  /> */
  }
  //   const footerContent = (
  //     <div
  //       className="
  //       flex
  //       flex-col
  //       border-t-[1px]
  //       border-dark
  //       w-full
  //       gap-4
  //       p-6
  //       "
  //     >
  //       <Button
  //         label="Continue with Google"
  //         icon={FcGoogle}
  //         onClick={() => signIn("google")}
  //         outline
  //       />
  //       <Button
  //         label="Continue with Github"
  //         icon={AiFillGithub}
  //         onClick={() => signIn("github")}
  //         outline
  //       />
  //       <div className="text-center text-dark/60">
  //         Don't have an account?{" "}
  //         <span
  //           onClick={() => {
  //             loginModal.onClose();
  //             registerModal.onOpen();
  //           }}
  //           className="text-center text-dark cursor-pointer hover:underline"
  //         >
  //           Sign up
  //         </span>
  //       </div>
  //     </div>
  //   );
  return (
    <>
      <Modal
        // disabled={isLoading}
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        title="Make a Hive!"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        onSubmit={step === STEPS.PRICE ? rentModal.onClose : onNext}
        body={bodyContent}
        // footer={footerContent}
      />
    </>
  );
};

export default RentModal;
