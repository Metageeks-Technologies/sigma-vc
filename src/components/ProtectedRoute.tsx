"use client";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import {
  setWalletAddress,
  setISAuthenticated,
  setIsAdmin,
} from "@/redux/features/user/slice";
import { useAppDispatch } from "@/redux/hooks";
import { setMobile } from "@/redux/features/ui/slice";

const ProtectedRoute = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { address: accountAddress } = useAccount();
  const router = useRouter();
  const dispatch = useAppDispatch();

  console.log(accountAddress, "accountAddress");

  useEffect(() => {
    if (!accountAddress) {
      dispatch(setWalletAddress(null));
      dispatch(setISAuthenticated(false));
      dispatch(setIsAdmin(false));
      router.push("/");
    } else {
      dispatch(setWalletAddress(accountAddress));
      dispatch(setISAuthenticated(true));
      if (
        accountAddress.toLocaleLowerCase() ===
        "0xC42132Dc3c5a2a7b5B33c61d12b94fFa54A0ca19"
          .toString()
          .toLocaleLowerCase()
      ) {
        dispatch(setIsAdmin(true));
      }
      if (window.innerWidth <= 768) {
        router.push("/dashboard-mobile");
        dispatch(setMobile(true));
      } else {
        router.push("/dashboard");
      }
    }
  }, [accountAddress]);

  return children;
};

export default ProtectedRoute;
