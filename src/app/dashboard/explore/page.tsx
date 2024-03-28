"use client";
import React from "react";
import List from "@/components/dashboard/explore/List";
import BuyProject from "@/components/ui/popup/BuyProject";
import SellProject from "@/components/ui/popup/SellProject";
import { useAppSelector } from "@/redux/hooks";

const page = () => {
  const { isBuyProject, isSellProject } = useAppSelector(
    (state) => state.uiState
  );
  return (
    <div className="px-4 py-6">
      <List />
      {isBuyProject && <BuyProject />}
      {isSellProject && <SellProject />}
    </div>
  );
};

export default page;
