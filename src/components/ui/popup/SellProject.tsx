"use client";
import { setSellPrice } from "@/redux/features/ui/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { sellStack } from "@/utils/apiCalls";
import { setSelectedProject } from "@/redux/features/ui/slice";
import { stat } from "fs";
import { Investment } from "@/types/Investment";
import { cn } from "@/lib/utils";

const SellProject = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.uiState.selectedProject);
  const { walletAddress } = useAppSelector((state) => state.user);
  const [amount, setAmount] = useState(0);
  const [investment, setInvestment] = useState<Investment | null>();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchInvestment = async () => {
      const response = await fetch(
        `/api/investment/by-project-with-user?user_address=${walletAddress}&project_id=${project?._id}`
      );
      const data = await response.json();
      // console.log(data.investment, "data");
      setInvestment(data.investment);
    };
    fetchInvestment();
  }, []);

  const handleSell = async () => {
    setIsProcessing(true);
    await sellStack({
      askAmount: amount,
      projectID: project?._id || "",
      userAddress: walletAddress,
    });
    setIsProcessing(false);
    setAmount(0);
    dispatch(setSellPrice(false));
    dispatch(setSelectedProject(project));
  };

  const growthMultiple = project
    ? Number((project.currentTokenPrice / project.listingTokenPrice).toFixed(2))
    : 1;

  // console.log(investment, "investment");
  return (
    <div className=" h-screen fixed inset-0 backdrop-blur-md w-full  flex justify-center items-center">
      {project && (
        <div className="flex flex-col pt-4 pb-8 rounded-2xl bg-neutral-950 max-w-[600px]">
          <div className="flex gap-5 justify-between self-center w-full text-2xl font-bold leading-9 text-center text-white whitespace-nowrap max-w-[371px]">
            <div>
              Sell
              <br />
            </div>
            <button onClick={() => dispatch(setSellPrice(false))}>
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
                  {/* <div className="justify-center px-4 py-2 text-sm font-bold leading-6 text-white shadow-sm bg-neutral-900">
                    Project Name
                  </div> */}
                  <div className="flex flex-col justify-center px-4 py-2 w-full text-center shadow-sm bg-neutral-900">
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
                          <div className="text-zinc-400 text-start">
                            Current Token Price:
                          </div>
                          <div className="font-bold whitespace-nowrap text-white">
                            $ {project.currentTokenPrice}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[24%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow">
                  <div className="justify-center px-4 py-2 whitespace-nowrap text-sm font-bold leading-6 text-white shadow-sm bg-neutral-900">
                    Current Price
                  </div>
                  <div className="flex flex-col justify-center items-start p-4 w-full text-center whitespace-nowrap shadow-sm bg-neutral-900 max-md:pr-5">
                    <div className="flex gap-1">
                      <div className="text-base font-bold leading-6 text-white">
                        $ {project.currentTokenPrice}
                      </div>
                      <span
                        className={cn(
                          "text-xs  ms-2",
                          growthMultiple < 1 ? "text-red-500" : "text-green-500"
                        )}
                      >
                        {`${growthMultiple}x`}
                      </span>
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
                        {project.symbol}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-xl mx-4 mt-8 text-white max-md:max-w-full">
            Bought Price : {investment ? investment.boughtAmount : "-"}
          </div>

          <div className="text-xl mx-4 mt-8 text-white max-md:max-w-full">
            Asking amount
          </div>
          <div className="flex gap-5 justify-center px-4 mx-4 py-5 mt-4 rounded-2xl bg-neutral-900 leading-[160%] max-md:flex-wrap max-md:max-w-full">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter Amount"
              className=" text-white bg-black  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {/* <button
              onClick={() => setAmount(Number(balance))}
              className="text-base text-fuchsia-600"
            >
              MAX
            </button> */}
          </div>
          <div className="px-4 py-5 mt-4 ">
            <button
              disabled={isProcessing || investment?.saleStatus}
              onClick={handleSell}
              className="justify-center items-center w-full px-4 py-3 mt-8 text-lg leading-6 text-white whitespace-nowrap rounded-2xl bg-[linear-gradient(86deg,#D16BA5_-14.21%,#BA83CA_15.03%,#9A9AE1_43.11%,#69BFF8_74.29%,#52CFFE_90.94%,#5FFBF1_111.44%)] max-md:px-5 max-md:max-w-full"
            >
              {isProcessing
                ? "Processing..."
                : investment?.saleStatus
                ? "Already listed"
                : "Sell"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellProject;
