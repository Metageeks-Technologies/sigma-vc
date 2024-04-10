"use client";
import Hero from "@/components/landing/Hero";
import Header from "@/components/ui/Header";
import { setWalletAddress } from "@/redux/features/user/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const dispatch = useAppDispatch();

  const { address: accountAddress } = useAccount();

  useEffect(() => {
    accountAddress
      ? dispatch(setWalletAddress(accountAddress))
      : dispatch(setWalletAddress(null));
  }, [accountAddress]);

  return (
    <main className="max-h-screen overflow-hidden bg-black ">
      <Header />
      <Hero />
    </main>
  );
}
