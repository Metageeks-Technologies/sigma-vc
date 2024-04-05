"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setBuyProject, setSelectedProject } from "@/redux/features/ui/slice";
import { useAppSelector } from "@/redux/hooks";
import { useContractData } from "@/utils/hooks";
import { getAddressByNetwork } from "@/utils/helper";
import { addInvestment } from "@/utils/apiCalls";
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
import Link from "next/link";

const BuyProject = () => {
  const dispatch = useAppDispatch();
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const { address: accountAddress, chain } = useAccount();
  const project = useAppSelector((state) => state.uiState.selectedProject);

  const [symbolState, setSymbolState] = useState("");
  const [chainName, setChainName] = useState<string>("");
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const [addressType, setAddressType] = useState("USDT");

  const addressName = addressType === "USDT" ? USDTAddresses : USDCAddresses;

  const { tokenBalance, symbol, decimals } = useContractData(
    chainName,
    addressName,
    accountAddress as string
  );

  console.log(chainName, "chainName");
  console.log(balance, "balance");

  useEffect(() => {
    if (tokenBalance !== undefined && decimals)
      setBalance((tokenBalance / BigInt(10 ** decimals)).toString());
    if (symbol) setSymbolState(symbol);
    setChainName(chain?.name || "");
  }, [accountAddress, tokenBalance, chain, addressType]);

  useEffect(() => {
    const investment = async () => {
      if (isSuccess) {
        await addInvestment({
          investorAddress: accountAddress,
          investedAmount: amount,
          projectID: project?._id || "",
          symbolType: symbolState,
        });
        dispatch(setBuyProject(false));
        dispatch(setSelectedProject(null));
      }
    };
    investment();
  }, [isSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError("");
    setAmount(Number(e.target.value));
  };

  const transaction = async () => {
    if (!amount || !project) {
      setError("Please enter a valid amount");
      return;
    }
    if (amount < project.minimumBuy || amount > project.maximumBuy) {
      setError("Amount should be between minimum and maximum buy amount");
      return;
    }
    console.log("clicked");
    if (!decimals || !chainName || !addressName) return;
    writeContract({
      abi: tokenABI.abi,
      // @ts-expect-error: Object is possibly 'null'.
      address: getAddressByNetwork(chainName, addressName),
      functionName: "transfer",
      args: [
        // @ts-expect-error: Object is possibly 'null'.
        getAddressByNetwork(chainName, MultiSenderAddress),
        BigInt(amount * 10 ** decimals),
      ],
    });
  };

  return (
    <div className=" h-screen fixed inset-0 backdrop-blur-md w-full  flex justify-center items-center">
      {project && (
        <div className="flex flex-col pt-4 pb-8 rounded-2xl bg-neutral-950 max-w-[600px]">
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
                  {/* <div className="justify-center px-4 py-2 text-sm rounded-t-sm font-bold leading-6 text-white shadow-sm bg-neutral-900">
                    Project Name
                  </div> */}
                  <div className="flex flex-col rounded-b-sm justify-center px-4 py-2 w-full text-center shadow-sm bg-neutral-900">
                    <div className="flex gap-2">
                      <img
                        loading="lazy"
                        src={
                          project.logo ||
                          "https://cdn.builder.io/api/v1/image/assets/TEMP/b68b0cdae57733bdd44ea3de41b7744a0a86c1750bee1107078dfa06a9bccdc0?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
                        }
                        className="shrink-0 my-auto w-12 aspect-square"
                      />

                      <div className="flex flex-col">
                        <div className="flex gap-1 font-bold text-white whitespace-nowrap">
                          <div className="text-base leading-6">
                            {project.name || ""}
                          </div>
                          {/* <div className="text-sm leading-6">(LINK)</div> */}
                        </div>
                        <div className="flex gap-0.5 text-xs leading-4">
                          <div className="text-zinc-400 me-3 text-start">
                            Current Token Price:
                          </div>
                          <div className="font-bold align-bottom whitespace-nowrap text-white">
                            ${" "}
                            {project.amountToRaise &&
                              project.totalTokenSupply &&
                              (
                                project.amountToRaise / project.totalTokenSupply
                              ).toFixed(2)}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[24%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow">
                  <div className="justify-center whitespace-nowrap  px-4 py-2 rounded-t-sm text-sm font-bold leading-6 text-white shadow-sm bg-neutral-900">
                    Asking Price
                  </div>
                  <div className="flex flex-col justify-center items-start p-4 w-full rounded-b-sm text-center whitespace-nowrap shadow-sm bg-neutral-900 max-md:pr-5">
                    <div className="flex gap-1">
                      <div className="text-base font-bold leading-6 text-white">
                        ${" "}
                        {project.amountToRaise &&
                          project.totalTokenSupply &&
                          (
                            project.amountToRaise / project.totalTokenSupply
                          ).toFixed(2)}{" "}
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
                  <div className="justify-center px-4 py-2 text-sm font-bold leading-6 rounded-t-sm text-white shadow-sm bg-neutral-900">
                    Token Amount
                  </div>
                  <div className="flex flex-col justify-center items-start p-4 w-full text-center rounded-b-sm whitespace-nowrap shadow-sm bg-neutral-900 max-md:pr-5">
                    <div className="flex gap-1">
                      <div className="text-base font-bold leading-6 text-white">
                        {project.totalTokenSupply}
                      </div>
                      <div className="my-auto text-xs leading-4 text-zinc-400">
                        {project.symbol}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-center mt-3 text-sm font-bold leading-6 text-transparent text-center bg-clip-text bg-[linear-gradient(86deg,#D16BA5_-14.21%,#BA83CA_15.03%,#9A9AE1_43.11%,#69BFF8_74.29%,#52CFFE_90.94%,#5FFBF1_111.44%)]">
            <Link href={`/dashboard/project/${project._id}`}>
              {" "}
              More details
            </Link>
          </div>
          <div className="flex flex-col px-4 mt-7 w-full font-bold max-md:max-w-full">
            <div className="text-xl text-white max-md:max-w-full">Pay In</div>
            <div className="flex gap-4 mt-5 max-md:flex-wrap">
              <div className="flex gap-2 justify-center text-sm leading-6 text-white whitespace-nowrap rounded-xl bg-neutral-900">
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
                    getAddressByNetwork(chainName, addressName)?.slice(0, 30)}
                  ...
                </div>
              </div>
            </div>
            <div className="text-white flex font-light gap-4 mt-4">
              <p>*Min value {project.minimumBuy}</p>
              <p>*Max value {project.maximumBuy}</p>
            </div>
            <div className="flex gap-5 justify-center px-4 py-5 mt-4 rounded-2xl bg-neutral-900 leading-[160%] max-md:flex-wrap max-md:max-w-full">
              <input
                type="number"
                value={amount}
                onChange={handleInputChange}
                placeholder="Enter Amount"
                className=" text-white bg-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button
                onClick={() => setAmount(Number(balance))}
                className="text-base text-fuchsia-600"
              >
                MAX
              </button>
            </div>
            {error && <p className=" text-xs my-1 text-red-500">*{error}</p>}
            <button
              onClick={transaction}
              className="justify-center items-center px-4 py-3 mt-8 text-lg leading-6 text-white whitespace-nowrap rounded-2xl bg-[linear-gradient(86deg,#D16BA5_-14.21%,#BA83CA_15.03%,#9A9AE1_43.11%,#69BFF8_74.29%,#52CFFE_90.94%,#5FFBF1_111.44%)] max-md:px-5 max-md:max-w-full"
            >
              {isLoading || isPending ? "Processing..." : "Buy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyProject;
