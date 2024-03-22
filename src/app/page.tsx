"use client";
import Hero from "@/components/landing/Hero";
import Header from "@/components/ui/Header";
import LandingPage from "@/components/landing/Galary";
import NFTCollectionSection from "@/components/landing/NFTCollection";
import HeroSection from "@/components/landing/Ending";
import Footer from "@/components/ui/Footer";
import { useAppSelector } from "@/redux/hooks";
import ConnectWalletPopup from "@/components/ui/popup/ConnectWallet";
import { useAccount, useBalance } from "wagmi";
import { use, useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setWalletAddress } from "@/redux/features/user/slice";

export default function Home() {
  const dispatch = useAppDispatch();

  const { address: accountAddress } = useAccount();

  useEffect(() => {
    accountAddress
      ? dispatch(setWalletAddress(accountAddress))
      : dispatch(setWalletAddress(null));
  }, [accountAddress]);

  const { isLaunchApp } = useAppSelector((state) => state.uiState);
  return (
    <main className=" bg-black ">
      <Header />
      <Hero />
      <LandingPage />
      <NFTCollectionSection />
      <HeroSection />
      <Footer />
      {isLaunchApp && <ConnectWalletPopup />}
    </main>
  );
}
