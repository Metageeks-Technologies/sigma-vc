"use client";
import * as React from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setLaunchApp } from "@/redux/features/ui/slice";
interface WalletOption {
  name: string;
  imageSrc: string;
  imageAlt: string;
  onClick: () => void;
}

const WalletOptionItem: React.FC<WalletOption> = ({
  name,
  imageSrc,
  imageAlt,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="flex gap-5 justify-between px-6 py-4 mt-4 w-full whitespace-nowrap rounded-2xl bg-neutral-900 max-w-[556px] max-md:flex-wrap max-md:px-5 max-md:max-w-full"
  >
    <div className="flex-auto text-start my-auto">{name}</div>
    <img
      loading="lazy"
      src={imageSrc}
      alt={imageAlt}
      className="shrink-0 w-10 aspect-square"
    />
  </button>
);

const ConnectWalletPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className=" h-screen fixed inset-0 backdrop-blur-md w-full  flex justify-center items-center">
      <div className="flex my-10 px-6 flex-col items-center pt-6 pb-10 text-lg font-bold leading-7 text-white rounded-2xl bg-neutral-950 max-w-[604px]">
        <button
          onClick={() => dispatch(setLaunchApp(false))}
          className="w-full flex justify-end mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="self-stretch w-full text-2xl leading-9 text-center max-md:max-w-full">
          Welcome to SigmaVC. <br /> Please connect your wallet to start using
          our platform
        </h2>
        <section className="mt-10 w-full max-md:mt-10">
          {walletOptions.map((option) => (
            <WalletOptionItem key={option.name} {...option} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default ConnectWalletPopup;

const walletOptions: WalletOption[] = [
  {
    name: "MetaMask",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ef72f7ab83ca6d681c7e199d646996075a015aa2cf2c742107f1931b94751a8a?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    imageAlt: "MetaMask logo",
    onClick: () => console.log("MetaMask"),
  },
  {
    name: "BNB Smart Chain",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/f0d50d89d6cca9f052c6df95b313f7caff973426ca93fe069be62ba26ed6a0af?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    imageAlt: "BNB Smart Chain logo",
    onClick: () => console.log("BNB Smart Chain"),
  },
  {
    name: "Trust Wallet",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/f72d51c22517040832a3adeb0fcc9c70303fa3a0e1b47b4ab78cafab57105dea?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    imageAlt: "Trust Wallet logo",
    onClick: () => console.log("Trust Wallet"),
  },
  {
    name: "ConnectWallet",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ba32ecb29a764f148da72aa0b697aecf641c97f670d49f480e9d6d061c7755d9?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    imageAlt: "ConnectWallet logo",
    onClick: () => console.log("ConnectWallet"),
  },
  {
    name: "Portis",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3efa1537073722a3d3536fa029b8f29a569f077532739bffe8a8eb81bcf2598e?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    imageAlt: "Portis logo",
    onClick: () => console.log("Portis"),
  },
];
