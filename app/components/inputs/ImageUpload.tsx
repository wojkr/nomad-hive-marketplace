"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const uploadPreset = "aynes3ih";

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        function handleOnClick(e: React.MouseEvent) {
          e.preventDefault();
          open();
        }
        return (
          <button
            className={`
                relative
                flex
                flex-col
                justify-center
                items-center
                p-20
                border-dotted
                border-2
                ${value ? "border-dark/0" : "border-dark/40"}
                cursor-pointer
                hover:opacity-70
                transition
                `}
            onClick={handleOnClick}
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Upload an Image</div>
            {value && (
              <div
                className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    "
              >
                <Image
                  alt="upload"
                  src={value}
                  style={{ objectFit: "contain" }}
                  fill
                />
              </div>
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
