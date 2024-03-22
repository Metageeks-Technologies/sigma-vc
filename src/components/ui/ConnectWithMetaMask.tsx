"use client";
import React, { useEffect, useState } from "react";
// import Web3 from "web3";

// declare global {
//   interface Window {
//     ethereum: any;
//   }
// }

const ConnectWalletBtn = () => {
  //   const [ownerAddress, setOwnerAddress] = useState<string | null>(null);
  //   const [web3, setWeb3] = useState<Web3 | null>(null);

  //   useEffect(() => {
  //     if (window && typeof window?.ethereum !== "undefined") {
  //       const web3Instance = new Web3(window.ethereum);
  //       setWeb3(web3Instance);
  //     }
  //   }, []);

  //   const connectWallet = async () => {
  //     if (web3) {
  //       try {
  //         const accounts = await window.ethereum.enable();
  //         setOwnerAddress(accounts[0]);
  //         // notifyInfo("Wallet connected successfully");
  //       } catch (error) {
  //         //   notifyError("Wallet connection failed");
  //       }
  //     } else {
  //       // notifyError("MetaMask is not installed");
  //     }
  //   };

  //   useEffect(() => {
  //     if (web3) {
  //       connectWallet();
  //     }
  //   }, [web3]);
  return (
    <button className="justify-center px-5 bg-blue-500 py-3.5 text-gray-100 rounded-lg">
      Launch dApp
    </button>
  );
};

export default ConnectWalletBtn;
