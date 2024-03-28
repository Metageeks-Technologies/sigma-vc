"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import type { IProject } from "@/types/project";
// import ConnectButton from "../components/connectButton";
// import constants from "../constants/constant";
// import contractsABI from "../abi/abis";
import { MultiSenderAddress, multiSenderABI, tokenABI } from "@/utils/ABI";
import { getAddressByNetwork } from "@/utils/helper";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { set } from "mongoose";

const MultiSendForm = () => {
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const [isApprove, setIsApprove] = useState<boolean>(false);

  const [chainName, setChainName] = useState<string | undefined>();
  const [inputAddress, setInputAddress] = useState<string>();
  const { address: accountAddress, chain: chain } = useAccount();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [investments, setInvestments] = useState<
    { address: string; amount: number }[]
  >([]);

  const max =
    "115792089237316195423570985008687907853269984665640564039457584007913129639935";

  useEffect(() => {
    setChainName(chain?.name);
  }, [accountAddress, chain]);

  useEffect(() => {
    const getAllProject = async () => {
      const result = await axios.get("/api/project");
      setProjects(result.data.projects);
    };
    getAllProject();
  }, []);

  const { data: decimals } = useReadContract({
    abi: tokenABI.abi,
    // @ts-expect-error: Object is possibly 'null'.
    address: inputAddress, //from address
    functionName: "decimals",
  });

  //  function getAddressByNetwork(network: string): string | undefined {
  //    const entry = MultiSenderAddress.find(([key]) => key === network);
  //    return entry?.[1];
  //  }

  const multiSendApprove = () => {
    console.log("Multi-send-approve called");
    writeContract({
      abi: tokenABI.abi,
      // @ts-expect-error: Object is possibly 'null'.
      address: inputAddress,
      functionName: "approve",
      args: [
        // @ts-expect-error: Object is possibly 'null'.
        getAddressByNetwork(chainName, MultiSenderAddress),
        BigInt(max),
      ],
      account: accountAddress,
    });
  };

  const multiSend = () => {
    console.log("Multi-send called");

    if (!decimals) return;
    const addresses = investments.map((entry) => entry.address);
    const amounts = investments.map((entry) => entry.amount);

    writeContract({
      abi: multiSenderABI.abi,
      // @ts-expect-error: Object is possibly 'null'.
      address: getAddressByNetwork(chainName, MultiSenderAddress),
      functionName: "sendToken",
      args: [
        // @ts-expect-error: Object is possibly 'null'.
        inputAddress,
        // @ts-expect-error: Object is possibly 'null'.
        addresses,
        amounts.map((amount) => BigInt(amount * 10 ** decimals)),
      ],
    });
  };

  const handleNameChange = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        `/api/returns?project_id=${e.target.value}`
      );
      setInvestments(data.investments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSuccess) setIsApprove(true);
  }, [isSuccess]);

  return (
    <>
      {/* <ConnectButton /> */}
      <h1 className="flex items-center justify-center text-4xl font-bold text-black mb-6 mt-2">
        Multisend
      </h1>
      <div className="bg-black rounded-lg shadow-lg max-w-lg mx-auto my-10 p-4">
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Name
          </label>
          <select
            id="name"
            onChange={handleNameChange}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
          >
            <option className="text-white">Please select an option</option>
            {projects.map((obj, index) => {
              // console.log("obj", obj.name);
              return (
                <option className="text-white" key={index} value={obj._id}>
                  {obj.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-2">
          <label
            htmlFor="tokenAddress"
            className="block text-sm font-medium text-gray-300"
          >
            TokenAddress
          </label>
          <input
            type="text"
            value={inputAddress}
            id="tokenAddress"
            onChange={(e) => {
              setInputAddress(e.target.value);
            }}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
          />
        </div>
        <div className="flex justify-between px-2 py-4">
          <span className="text-base font-medium text-gray-300">Addresses</span>
          <span className="text-base font-medium text-gray-300">Amounts</span>
        </div>

        {investments.length > 0 &&
          investments.map((entry: any, index) => (
            <div
              key={index}
              className="flex justify-between mb-2 items-center p-2 "
            >
              <span className="text-gray-300 text">{entry.address || ""}</span>
              <span className="text-gray-300 ">{entry.amount || ""}</span>
            </div>
          ))}
        <div className="flex justify-center">
          <button
            disabled={isLoading || isPending || isApprove}
            onClick={multiSendApprove}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none m-2"
          >
            {(isLoading || isPending) && !isApprove
              ? "Approving..."
              : isApprove
              ? "Approved"
              : "Approve"}
          </button>
          {isApprove && (
            <button
              onClick={multiSend}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none m-2"
            >
              {isLoading || isPending ? "Sending..." : "Send"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MultiSendForm;
