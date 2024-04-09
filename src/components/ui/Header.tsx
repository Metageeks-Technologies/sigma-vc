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
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/af4289164bae88ae4b5cde24f73f45d56a29e975cdaef70d1834956f363d978f?apiKey=caf73ded90744adfa0fe2d98abed61c0&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/af4289164bae88ae4b5cde24f73f45d56a29e975cdaef70d1834956f363d978f?apiKey=caf73ded90744adfa0fe2d98abed61c0&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/af4289164bae88ae4b5cde24f73f45d56a29e975cdaef70d1834956f363d978f?apiKey=caf73ded90744adfa0fe2d98abed61c0&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/af4289164bae88ae4b5cde24f73f45d56a29e975cdaef70d1834956f363d978f?apiKey=caf73ded90744adfa0fe2d98abed61c0&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/af4289164bae88ae4b5cde24f73f45d56a29e975cdaef70d1834956f363d978f?apiKey=caf73ded90744adfa0fe2d98abed61c0&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/af4289164bae88ae4b5cde24f73f45d56a29e975cdaef70d1834956f363d978f?apiKey=caf73ded90744adfa0fe2d98abed61c0&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/af4289164bae88ae4b5cde24f73f45d56a29e975cdaef70d1834956f363d978f?apiKey=caf73ded90744adfa0fe2d98abed61c0&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/af4289164bae88ae4b5cde24f73f45d56a29e975cdaef70d1834956f363d978f?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
          className="shrink-0  self-center max-w-full aspect-[4.17] w-[166px]"
        />
        <div className="flex gap-5 my-auto max-md:flex-wrap">
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
