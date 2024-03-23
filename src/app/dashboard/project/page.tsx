"use client";
import React from "react";
import Listing from "@/components/dashboard/project/Listing";
import BuyProject from "@/components/ui/popup/BuyProject";
import { useAppSelector } from "@/redux/hooks";

const page = () => {
  const { isBuyProject } = useAppSelector((state) => state.uiState);
  return (
    <div className="px-4 py-6">
      <Listing />
      {isBuyProject && <BuyProject />}
    </div>
  );
};

export default page;
