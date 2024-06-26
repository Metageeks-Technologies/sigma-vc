"use client";
import React from "react";
import Listing from "@/components/dashboard/project/Listing";
import BuyProject from "@/components/ui/popup/BuyProject";
import SellProject from "@/components/ui/popup/SellProject";
import { useAppSelector } from "@/redux/hooks";
import Header from "@/components/dashboard/project/Header";

const page = () => {
  const { isBuyProject, isSellProject } = useAppSelector(
    (state) => state.uiState
  );
  const [filterStatus, setFilterStatus] = React.useState("ALL");
  return (
    <div className="px-4 py-6 min-h-screen">
      <Header setFilterStatus={setFilterStatus} filterStatus={filterStatus} />
      <Listing filterStatus={filterStatus} />
      {isBuyProject && <BuyProject />}
      {isSellProject && <SellProject />}
    </div>
  );
};

export default page;
