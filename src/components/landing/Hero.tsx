import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Hero = () => {
  return (
    <div className="flex  hero-bg bg-opacity-50 justify-center items-center px-16 pt-10 text-center border-b border-solid border-neutral-700 max-md:px-5">
      <div className="flex z flex-col mt-14 w-full max-w-[1604px] max-md:mt-10 max-md:max-w-full">
        <div className="self-center font-bold z-20 text-6xl text-gray-100 max-md:max-w-full max-md:text-4xl">
          ALPHA RAISE
        </div>
        <div className="overflow-hidden min-h-screen relative flex-col justify-center items-start px-12 max-md:px-2 pt-20 max-md:pt-10 mac w-full text-2xl leading-9 text-gray-300  max-md:pb-10 max-md:max-w-full">
          <p className="">Community driven, early-stage venture capital.</p>
          <p>
            We make private investments
            <br className="hidden md:block" />
            available to everyone
          </p>
          <div className="flex mt-20 max-md:mt-16 justify-center start">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
