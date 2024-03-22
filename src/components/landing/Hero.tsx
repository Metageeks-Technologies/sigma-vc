import React from "react";

const Hero = () => {
  return (
    <div className="flex justify-center items-center px-16 pt-10 text-center border-b border-solid border-neutral-700 max-md:px-5">
      <div className="flex flex-col mt-14 w-full max-w-[1604px] max-md:mt-10 max-md:max-w-full">
        <div className="self-center text-6xl text-gray-100 max-md:max-w-full max-md:text-4xl">
          We make private investments
          <br />
          available to everyone
        </div>
        <div className="overflow-hidden relative flex-col justify-center items-center px-16 pt-20 w-full text-2xl leading-9 text-gray-300 min-h-[806px] pb-[567px] max-md:px-5 max-md:pb-10 max-md:max-w-full">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/945aeae3231715d0cf18c79211b929b294db340ef3061ea0bce947c4b1dba059?apiKey=caf73ded90744adfa0fe2d98abed61c0&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/945aeae3231715d0cf18c79211b929b294db340ef3061ea0bce947c4b1dba059?apiKey=caf73ded90744adfa0fe2d98abed61c0&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/945aeae3231715d0cf18c79211b929b294db340ef3061ea0bce947c4b1dba059?apiKey=caf73ded90744adfa0fe2d98abed61c0&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/945aeae3231715d0cf18c79211b929b294db340ef3061ea0bce947c4b1dba059?apiKey=caf73ded90744adfa0fe2d98abed61c0&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/945aeae3231715d0cf18c79211b929b294db340ef3061ea0bce947c4b1dba059?apiKey=caf73ded90744adfa0fe2d98abed61c0&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/945aeae3231715d0cf18c79211b929b294db340ef3061ea0bce947c4b1dba059?apiKey=caf73ded90744adfa0fe2d98abed61c0&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/945aeae3231715d0cf18c79211b929b294db340ef3061ea0bce947c4b1dba059?apiKey=caf73ded90744adfa0fe2d98abed61c0&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/945aeae3231715d0cf18c79211b929b294db340ef3061ea0bce947c4b1dba059?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
            className="object-cover absolute inset-0 top-10 size-full"
          />
          <p className="">Community driven, early-stage venture capital</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
