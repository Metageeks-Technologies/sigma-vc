"use client";
import { setLaunchApp } from "@/redux/features/ui/slice";
import { useAppDispatch } from "@/redux/hooks";

const ConnectWalletBtn = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(setLaunchApp(true))}
      className="justify-center px-5 bg-blue-500 py-3.5 text-gray-100 rounded-lg"
    >
      Launch dApp
    </button>
  );
};

export default ConnectWalletBtn;
