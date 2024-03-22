import * as React from "react";
import ConnectWalletBtn from "../ui/ConnectWalletBtn";

function HeroSection() {
  return (
    <section className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 text-center min-h-[680px] max-md:px-5">
      <div className="flex relative flex-col mt-44 max-w-full w-[619px] max-md:mt-10">
        <h1 className="text-5xl text-white leading-[58px] max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
          We make private investments
          <br />
          available to everyone
        </h1>
        <div className="w  mt-10 flex justify-center items-center">
          <ConnectWalletBtn />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
