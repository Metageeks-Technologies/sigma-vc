"use client";
import React from "react";
import ConnectWalletBtn from "./ConnectWalletBtn";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

const Header = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  return (
    <div className="flex justify-center items-center px-16 py-4 text-base text-center text-gray-300 border-b border-solid backdrop-blur bg-zinc-900 bg-opacity-90 border-neutral-700 max-md:px-5">
      <div className="flex gap-5 justify-between max-w-full w-[1280px] max-md:flex-wrap">
        <p className="flex justify-center items-center font-bold">
          ALPHA RAISE
        </p>
        <div className="flex max-md:hidden gap-5 my-auto max-md:flex-wrap">
          <div className="grow">About</div>

          <div>Portfolio</div>
          <div>Team</div>
          <div>Contact</div>
        </div>
        <div className="flex gap-2 justify-center items-center">
          {isAuthenticated && (
            <Link href="/dashboard" className="text-white">
              Dashboard
            </Link>
          )}
          <div className="flex justify-center items-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
