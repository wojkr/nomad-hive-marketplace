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
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
    setIsOpen(false);
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
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

        <div
          className="
                      flex
                      flex-row
                      items-center
                      justify-evenly
                      gap-3
                      border-[1px]
                      border-dark
                      w-full 
                      md:w-auto
                      p-2
                      rounded-full
                      shadow-sm
                      hover:shadow-md
                      cursor-pointer
                      transition 
                      duration-200
                      "
          onClick={toggleOpen}
        >
          <BiMenu size="18" />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {/* HAMBURGER MENU */}
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
          <div
            className="fixed top-0 left-0 w-full h-[100dvh] z-[9]"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="relative flex flex-col cursor-pointer z-10">
            {currentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push("/properties")}
                />
                <MenuItem label="Create a hive" onClick={onRent} />
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
