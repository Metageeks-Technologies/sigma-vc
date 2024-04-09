import React from "react";

const page = () => {
  return (
    <div className="w-full text-[16px] gap-4 p-4 text-center h-screen flex-col bg-black flex justify-center items-center text-white">
      <img
        src={
          "https://cdn.builder.io/api/v1/image/assets/TEMP/57263eaee1be25e2c9b9347d12091b0db551bbf10ef2540f4c75fae59d8588e2?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
        }
        alt=""
        className="mt-8 max-w-full aspect-square w-[108px]"
      />
      <p>
        Our App is not yet optimized for mobile devices. Please use a desktop or
        laptop to access the app.
      </p>
    </div>
  );
};

export default page;
