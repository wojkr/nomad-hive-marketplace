"use client";

import React, { useState, useCallback, useMemo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRentModal from "@/app/hooks/useRentModal";
import dynamic from "next/dynamic";
import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const router = useRouter();
  const onBack = () => setStep((prev) => prev - 1);
  const onNext = () => setStep((prev) => prev + 1);
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Back";
  }, [step]);

  const defaultValues = {
    category: "",
    location: null,
    guestCount: 1,
    roomCount: 1,
    bathroomCount: 1,
    imageSrc: "",
    price: 1,
    title: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues,
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true, //user has made changes to a form input field
      shouldTouch: true,
      shouldValidate: true,
    });
    setMessage("");
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (
      (step === STEPS.CATEGORY && category == defaultValues.category) ||
      (step === STEPS.LOCATION && location == defaultValues.location) ||
      (step === STEPS.IMAGES && imageSrc == defaultValues.imageSrc)
    ) {
      return setMessage("Please provide valid input");
    }
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Successfully added your place!");
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
        router.refresh();
      })
      .catch((e) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  let bodyContent = (
    <div className="flex flex-col gap-8">
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
      {message != "" && (
        <p className="text-red-600 font-semibold text-lg">{message}</p>
      )}
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Add an address"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
        {message != "" && (
          <p className="text-red-600 font-semibold text-lg">{message}</p>
        )}
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some key info about your rental property!"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow>"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Upload images of your Hive!"
          subtitle="Add some pictures of your property."
        />
        <ImageUpload
          value={imageSrc}
          onChange={(imageSrc) => setCustomValue("imageSrc", imageSrc)}
        />
        {message != "" && (
          <p className="text-red-600 font-semibold text-lg">{message}</p>
        )}
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Provide a brief description of your place."
          subtitle="Kindly share a tasteful portrayal of the ambiance and style of your dwelling"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="description"
          label="Description"
          type="textarea"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        title="Rent Your Hive!"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
      />
    </>
  );
};

export default RentModal;
