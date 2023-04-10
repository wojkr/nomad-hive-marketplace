"use client";

import React from "react";
import { BiMenu } from "react-icons/bi";
import Box from "../Box";
import Avatar from "../Avatar";
import { useState, useCallback } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="
        hidden md:block
        py-3 px-4 rounded-full
        whitespace-nowrap font-semibold text-sm 
       hover:bg-accentDark hover:text-white cursor-pointer tranisiton duration-300
        "
        >
          {" "}
          make a Hive
        </div>

        <Box>
          <div
            className="
        flex
        flex-row
        items-center
        justify-evenly
        gap-3"
          >
            <BiMenu size="18" onClick={toggleOpen} />
            <div className="hidden md:block">
              <Avatar />
            </div>
          </div>
        </Box>
      </div>
      {isOpen && (
        <div
          className="
      absolute
      rounded-xl 
      shadow-md
      w-[40vw]
      bg-light
      overflow-hidden
      right-0
      top-12
      text-sm
      border-dark
      border-[1px]
    
      "
        >
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem label="Login" onClick={loginModal.onOpen} />
              <MenuItem label="Sign Up" onClick={registerModal.onOpen} />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
