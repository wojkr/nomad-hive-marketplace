"use client";

import React from "react";
import { BiMenu } from "react-icons/bi";
import Box from "../Box";
import Avatar from "../Avatar";
import { useState, useCallback } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import { SafeUser } from "@/app/types/index";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
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
      w-max
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
            {currentUser ? (
              <>
                <MenuItem label="My trips" onClick={() => {}} />
                <MenuItem label="My favorites" onClick={() => {}} />
                <MenuItem label="My reservations" onClick={() => {}} />
                <MenuItem label="My properties" onClick={() => {}} />
                <MenuItem label="Create a hive" onClick={() => {}} />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign Up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
