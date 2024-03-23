"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setBuyProject, setSelectedProject } from "@/redux/features/ui/slice";
import {
  tokenABI,
  USDCAddresses,
  USDTAddresses,
  MultiSenderAddress,
} from "@/utils/ABI";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import axios from "axios";

import { useAppSelector } from "@/redux/hooks";
import { describe } from "node:test";

const BuyProject = () => {
  const dispatch = useAppDispatch();
  const { data: hash, isPending, writeContract } = useWriteContract();
  const [address, setAddress] = useState<string | undefined>();
  const [chainName, setChainName] = useState<string | undefined>();
  const { address: accountAddress, chain: chain } = useAccount();
  const [balance, setBalance] = useState("");
  const [symbolState, setSymbolState] = useState("");
  const [amount, setAmount] = useState(0);

  const { walletAddress } = useAppSelector((state) => state.user);
  const [addressType, setAddressType] = useState("USDT");
  const project = useAppSelector((state) => state.uiState.selectedProject);

  function getAddressByNetwork(
    network: string,
    addressType: string[][]
  ): string | undefined {
    const entry = addressType.find(([key]) => key === network);
    return entry?.[1];
  }
  //   function getUSDTAddressByNetwork(network: string): string | undefined {
  //     const entry = USDTAddresses.find(([key]) => key === network);
  //     return entry?.[1];
  //   }

  //   function getUSDCAddressByNetwork(network: string): string | undefined {
  //     const entry = USDCAddresses.find(([key]) => key === network);
  //     return entry?.[1];
  //   }
  const addressName = addressType === "USDT" ? USDTAddresses : USDCAddresses;

  const { data: tokenBalance } = useReadContract({
    abi: tokenABI.abi,
    // @ts-expect-error: Object is possibly 'null'.
    address: getAddressByNetwork(chainName, addressName),
    functionName: "balanceOf",
    // @ts-expect-error: Object is possibly 'null'.
    args: [address],
  });

  const { data: symbol } = useReadContract({
    abi: tokenABI.abi,
    // @ts-expect-error: Object is possibly 'null'.
    address: getAddressByNetwork(chainName, addressName),
    functionName: "symbol",
  });

  const { data: decimals } = useReadContract({
    abi: tokenABI.abi,
    // @ts-expect-error: Object is possibly 'null'.
    address: getAddressByNetwork(chainName, addressName),
    functionName: "decimals",
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (tokenBalance && decimals)
      setBalance((tokenBalance / BigInt(10 ** decimals)).toString());
    if (symbol) setSymbolState(symbol);
    setAddress(accountAddress);
    setChainName(chain?.name);
  }, [accountAddress, tokenBalance, chain, addressType]);

  const transaction = async () => {
    if (!decimals || !chainName || !addressName) return;
    const contractAdd = getAddressByNetwork(chainName, addressName);
    if (!contractAdd) return;
    console.log("clicker the buy");
    await writeContract({
      abi: tokenABI.abi,
      // @ts-expect-error: Object is possibly 'null'.
      address: contractAdd,
      functionName: "transfer",
      args: [
        // @ts-expect-error: Object is possibly 'null'.
        getAddressByNetwork(chainName, MultiSenderAddress),
        BigInt(amount * 10 ** decimals),
      ],
    });

    // dispatch(setBuyProject(false));
    // dispatch(setSelectedProject(null));
  };

  useEffect(() => {
    const temp = async () => {
      if (isConfirmed) {
        console.log("adding investemnt");
        await addInvestment();
      } else {
        console.log("cant invest");
      }
    };
    temp();
  }, [isConfirmed]);

  const addInvestment = async () => {
    axios
      .post("http://localhost:3000/api/investment", {
        investorAddress: accountAddress,
        investedAmount: amount,
        projectID: project?._id || "",
      })
      .then((response) => {
        console.log(response);
        alert("Project listed successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" h-screen fixed inset-0 backdrop-blur-md w-full  flex justify-center items-center">
      {project && (
        <div className="flex flex-col pt-4 pb-8 rounded-2xl bg-neutral-950 max-w-[484px]">
          <div className="flex gap-5 justify-between self-center w-full text-2xl font-bold leading-9 text-center text-white whitespace-nowrap max-w-[371px]">
            <div>
              Buy
              <br />
            </div>
            <button onClick={() => dispatch(setBuyProject(false))}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/140ac067d56c5885222bf298146f2a7505a185f61ce57a61090f7445e433a519?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
                className="shrink-0 self-start aspect-square w-[27px]"
              />
            </button>
          </div>
          <div className="px-5 w-full max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[45%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow">
                  <div className="justify-center px-4 py-2 text-sm font-bold leading-6 text-white shadow-sm bg-neutral-900">
                    Project Name
                  </div>
                  <div className="flex flex-col justify-center px-4 py-2 w-full text-center shadow-sm bg-neutral-900">
                    <div className="flex gap-2">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f06eb16de46074635e0da65184d5f8d24350a6c4d5e511f6529a320dba1f151a?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
                        className="shrink-0 my-auto w-8 aspect-square"
                      />
                      <div className="flex flex-col">
                        <div className="flex gap-1 font-bold text-white whitespace-nowrap">
                          <div className="text-base leading-6">
                            {project.name || ""}
                          </div>
                          {/* <div className="text-sm leading-6">(LINK)</div> */}
                        </div>
                        <div className="flex gap-0.5 text-xs leading-4">
                          <div className="text-zinc-400">
                            Current Token Price:
                          </div>
                          <div className="font-bold text-white">
                            ${" "}
                            {project.amountToRaise &&
                              project.totalTokenSupply &&
                              project.amountToRaise /
                                project.totalTokenSupply}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[24%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow">
                  <div className="justify-center px-4 py-2 text-sm font-bold leading-6 text-white shadow-sm bg-neutral-900">
                    Asking Price
                  </div>
                  <div className="flex flex-col justify-center items-start p-4 w-full text-center whitespace-nowrap shadow-sm bg-neutral-900 max-md:pr-5">
                    <div className="flex gap-1">
                      <div className="text-base font-bold leading-6 text-white">
                        ${" "}
                        {project.amountToRaise &&
                          project.totalTokenSupply &&
                          project.amountToRaise / project.totalTokenSupply}{" "}
                      </div>
                      <div className="text-sm font-medium leading-6 text-green-500">
                        1x
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[31%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow">
                  <div className="justify-center px-4 py-2 text-sm font-bold leading-6 text-white shadow-sm bg-neutral-900">
                    Token Amount
                  </div>
                  <div className="flex flex-col justify-center items-start p-4 w-full text-center whitespace-nowrap shadow-sm bg-neutral-900 max-md:pr-5">
                    <div className="flex gap-1">
                      <div className="text-base font-bold leading-6 text-white">
                        {project.totalTokenSupply}
                      </div>
                      <div className="my-auto text-xs leading-4 text-zinc-400">
                        LINK
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-center mt-3 text-sm font-bold leading-6 text-transparent text-center bg-clip-text bg-[linear-gradient(86deg,#D16BA5_-14.21%,#BA83CA_15.03%,#9A9AE1_43.11%,#69BFF8_74.29%,#52CFFE_90.94%,#5FFBF1_111.44%)]">
            More Details
          </div>
          <div className="flex flex-col px-4 mt-7 w-full font-bold max-md:max-w-full">
            <div className="text-xl text-white max-md:max-w-full">Pay In</div>
            <div className="flex gap-4 mt-5 max-md:flex-wrap">
              <div className="flex gap-2 justify-center text-sm leading-6 text-white whitespace-nowrap rounded-xl bg-neutral-900">
                {/* <div className="flex gap-2">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c48c5b6e3a5e1ffc61b926c6c74c25dd397974ee2263fbab85dd59d0b49569b7?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
                  className="shrink-0 w-6 aspect-square"
                />
                <div>BSC</div>
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d0dfbaa5483eea4306ca6f4ca549536d6c67cf39ee7ee00799e3c8347fb56a9?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
                className="shrink-0 my-auto w-4 aspect-square"
              /> */}
                <Select value={addressType} onValueChange={setAddressType}>
                  <SelectTrigger className="w-[140px] mt-1 border-gray-600 bg-gray-800 text-white p-3">
                    <SelectValue placeholder="USDT" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-center px-4 py-2 rounded-xl bg-neutral-900 leading-[160%]">
                <div className="text-xs leading-6 text-transparent bg-clip-text bg-[linear-gradient(86deg,#D16BA5_-14.21%,#BA83CA_15.03%,#9A9AE1_43.11%,#69BFF8_74.29%,#52CFFE_90.94%,#5FFBF1_111.44%)]">
                  {balance} {symbolState}
                </div>
                <div className="text-base text-white">|</div>
                <div className="my-auto text-sm text-white">
                  {chainName &&
                    addressName &&
                    getAddressByNetwork(chainName, addressName)?.slice(0, 7)}
                  ...
                </div>
              </div>
            </div>
            <div className="flex gap-5 justify-center px-4 py-5 mt-4 rounded-2xl bg-neutral-900 leading-[160%] max-md:flex-wrap max-md:max-w-full">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter Amount"
                className="flex-auto text-lg text-black"
              />
              <button
                onClick={() => setAmount(Number(balance))}
                className="text-base text-fuchsia-600"
              >
                MAX
              </button>
            </div>
            <button
              onClick={transaction}
              className="justify-center items-center px-4 py-3 mt-8 text-lg leading-6 text-white whitespace-nowrap rounded-2xl bg-[linear-gradient(86deg,#D16BA5_-14.21%,#BA83CA_15.03%,#9A9AE1_43.11%,#69BFF8_74.29%,#52CFFE_90.94%,#5FFBF1_111.44%)] max-md:px-5 max-md:max-w-full"
            >
              {isPending ? "Processing..." : "Buy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyProject;
