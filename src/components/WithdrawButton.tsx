"use client";
import {
  MultiSenderAddress,
  USDCAddresses,
  USDTAddresses,
  multiSenderABI,
  tokenABI,
} from "@/utils/ABI";
import { getAddressByNetwork } from "@/utils/helper";
import { useEffect } from "react";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import axios from "axios";

const WithdrawButton = ({
  WithdrawingIn,
  chainName,
  amount,
  projectID,
}: {
  WithdrawingIn: string;
  chainName: string;
  projectID: string;
  amount: number;
}) => {
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const addressName = WithdrawingIn === "USDT" ? USDTAddresses : USDCAddresses;

  const { data: decimals } = useReadContract({
    abi: tokenABI.abi,
    // @ts-expect-error: Object is possibly 'null'.
    address: getAddressByNetwork(chainName, addressName), //wil have to doffrent desimal for each token
    functionName: "decimals",
  });

  const withdrawAssets = () => {
    if (!decimals) return;

    writeContract({
      abi: multiSenderABI.abi,
      // @ts-expect-error: Object is possibly 'null'.
      address: getAddressByNetwork(chainName, MultiSenderAddress),
      functionName: "withdrawTokenBalance",
      args: [
        // @ts-expect-error: Object is possibly 'null'.
        getAddressByNetwork(chainName, addressName),
        BigInt(amount * 10 ** decimals),
      ],
    });
  };

  useEffect(() => {
    const updateDB = async () => {
      await axios.patch(
        `/api/project/${projectID}`,
        WithdrawingIn === "USDT"
          ? { fundRaisedInUSDT: 0 }
          : { fundRaisedInUSDC: 0 }
      );
    };
    if (isSuccess) updateDB();
  }, [isSuccess]);

  return (
    <button
      onClick={withdrawAssets}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none m-2"
    >
      {isLoading || isPending ? "Withdrawing" : `Withdraw ${WithdrawingIn}`}
    </button>
  );
};

export default WithdrawButton;
