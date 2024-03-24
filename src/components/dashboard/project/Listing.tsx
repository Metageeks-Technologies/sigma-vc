"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import constants from "@/utils/constants";
import { ethers } from "ethers";
import axios from "axios";
import type { IProject } from "@/types/project";
import { useAppDispatch } from "@/redux/hooks";
import { setBuyProject } from "@/redux/features/ui/slice";
import { setSelectedProject } from "@/redux/features/ui/slice";

interface TokenDetailsProps {
  buyers: number;
  sellers: number;
  toClaim: number;
  price: string;
  type: string;
  currentPrice: string;
  currentPriceMultiplier: string;
}

const TokenDetails: React.FC<IProject> = (project) => {
  return (
    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
      <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow">
          <div className="justify-center px-4 py-2 text-base font-bold leading-6 text-white shadow-sm bg-neutral-900">
            Token Details
          </div>
          <div className="flex flex-col items-start py-2 pr-20 pl-4 text-center whitespace-nowrap shadow-sm bg-neutral-900 max-md:pr-5">
            <div className="text-sm font-bold leading-6 text-white">
              {project.numberOfBuyer || 0}
            </div>
            <div className="text-xs leading-4 text-zinc-400">Buyers</div>
          </div>
          <div className="flex flex-col items-start py-2 pr-20 pl-4 text-center whitespace-nowrap shadow-sm bg-neutral-900 max-md:pr-5">
            <div className="text-sm font-bold leading-6 text-white">
              {project.numberOfSeller || 0}
            </div>
            <div className="text-xs leading-4 text-zinc-400">Sellers</div>
          </div>
          <div className="flex flex-col items-start py-2 pr-20 pl-4 text-center shadow-sm bg-neutral-900 max-md:pr-5">
            <div className="text-sm font-bold leading-6 text-white">{"0"}</div>
            <div className="text-xs leading-4 text-zinc-400">To claim</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow text-center">
          <div className="shrink-0 h-14 shadow-sm bg-neutral-900" />
          <div className="flex flex-col items-start py-2 pr-20 pl-4 whitespace-nowrap shadow-sm bg-neutral-900 max-md:pr-5">
            <div className="text-sm font-bold leading-6 text-white">
              ${" "}
              {project.amountToRaise &&
                project.totalTokenSupply &&
                project.amountToRaise / project.totalTokenSupply}{" "}
            </div>
            <div className="text-xs leading-4 text-zinc-400">Price</div>
          </div>
          <div className="flex flex-col items-start py-2 pr-20 pl-4 whitespace-nowrap shadow-sm bg-neutral-900 max-md:pr-5">
            <div className="text-sm font-bold leading-6 text-white">
              {project.type}
            </div>
            <div className="text-xs leading-4 text-zinc-400">Type</div>
          </div>
          <div className="flex flex-col items-start py-2 pr-20 pl-4 shadow-sm bg-neutral-900 max-md:pr-5">
            <div className="text-sm font-bold leading-6 text-white">
              {/* {"current price"}{" "} */}${" "}
              {project.amountToRaise &&
                project.totalTokenSupply &&
                project.amountToRaise / project.totalTokenSupply}{" "}
              <span className="text-xs text-green-500">{"1x"}</span>
            </div>
            <div className="text-xs leading-4 text-zinc-400">Current price</div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TokenCardProps {
  icon: string;
  blockchain: string;
  subBlockchain: string;
  status: string;
  tokenDetails: TokenDetailsProps;
  buyIcon: string;
  sellIcon: string;
}

const TokenCard: React.FC<IProject> = (project) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col w-[45%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow justify-center p-6 w-full rounded-2xl bg-neutral-900 max-md:px-5 max-md:mt-8 max-md:max-w-full">
        <div className="flex gap-4 justify-between w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-2 text-base font-bold leading-7 text-zinc-400">
            {/* <img
              loading="lazy"
              src={icon}
              alt=""
              className="shrink-0 self-start w-8 aspect-square"
            /> */}
            <div>
              {project.name || "chain"}
              <br />
              <span className="text-sm font-medium leading-6 text-zinc-400">
                {project.chain || "subchian"}
              </span>
            </div>
          </div>
          <div className="my-auto text-sm leading-6 text-pink-500">
            {project.status || "status"}
          </div>
        </div>
        <div className="mt-4 max-md:max-w-full">
          <TokenDetails {...project} />
        </div>
        <div className="flex gap-4 mt-4 text-sm font-bold leading-6 text-center whitespace-nowrap max-md:flex-wrap">
          <button
            onClick={() => dispatch(setBuyProject(true))}
            className="flex flex-1 gap-2 justify-center px-20 py-1 rounded-lg max-md:px-5"
          >
            <img
              loading="lazy"
              src={
                "https://cdn.builder.io/api/v1/image/assets/TEMP/c72cf2cf4addc19fc813fa73fe3452e8726d89303d1d8277c22f592b830a19c7?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
              }
              alt="buy"
              className="shrink-0 w-6 aspect-square"
            />
            <div
              onClick={() => dispatch(setSelectedProject(project))}
              className="bg-clip-text text-transparent bg-[linear-gradient(86deg,#D16BA5_-14.21%,#BA83CA_15.03%,#9A9AE1_43.11%,#69BFF8_74.29%,#52CFFE_90.94%,#5FFBF1_111.44%)]"
            >
              Buy
            </div>
          </button>
          <div className="flex flex-1 gap-2 justify-center px-20 py-1 rounded-lg max-md:px-5">
            <img
              loading="lazy"
              src={
                "https://cdn.builder.io/api/v1/image/assets/TEMP/dde09064ee70b3d8a0b1d91082b2391197bf1d7eec5f878cf20c9de744670058?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
              }
              alt=""
              className="shrink-0 w-6 aspect-square"
            />
            <div className="bg-clip-text text-transparent bg-[linear-gradient(86deg,#D16BA5_-14.21%,#BA83CA_15.03%,#9A9AE1_43.11%,#69BFF8_74.29%,#52CFFE_90.94%,#5FFBF1_111.44%)]">
              Sell
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Listing() {
  const [chainName, setChainName] = useState("");
  const [USDTAddress, setUSDTAddress] = useState<any>("");
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const getUSDTAddress = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const network = await (await provider.getNetwork()).name;
          // console.log(network);
          setChainName(network);
          setUSDTAddress(constants.USDTAddresses[chainName]);
          // console.log(USDTAddress);
        } catch (err) {
          console.log(err);
        }
      }
    };

    const getProjects = async () => {
      //         `${constants.DB_URL}/projects/getAllProjects`
      const result = await axios.get("http://localhost:3000/api/project");
      setProjects(result.data.projects);
      console.log(result, "projects");
    };

    getUSDTAddress();
    getProjects();
  }, [USDTAddress, chainName]);

  const length = projects.length;
  return (
    <div>
      <div className="flex flex-wrap gap-5 max-md:flex-col max-md:gap-0">
        {projects.map((tokenCard, index) => (
          <TokenCard key={index} {...tokenCard} />
        ))}
      </div>
    </div>
  );
}

export default Listing;

const tokenCardsData = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c9a0e87a3a003dac3e504619043edc7cdda6e96e2998f7979327c636399a9d54?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    blockchain: "Ethereum",
    subBlockchain: "Solana",
    status: "Not Launched",
    tokenDetails: {
      buyers: 1,
      sellers: 1,
      toClaim: 0,
      price: "$1",
      type: "ICO",
      currentPrice: "$0.21",
      currentPriceMultiplier: "1x",
    },
    buyIcon: "",
    sellIcon:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/dde09064ee70b3d8a0b1d91082b2391197bf1d7eec5f878cf20c9de744670058?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7ef2d3fdb4945bbcf8feb17a8beb5750f034951fbee9af5a19a84cfe6f683050?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    blockchain: "Ethereum",
    subBlockchain: "Solana",
    status: "Not Launched",
    tokenDetails: {
      buyers: 1,
      sellers: 1,
      toClaim: 0,
      price: "$1",
      type: "ICO",
      currentPrice: "$0.21",
      currentPriceMultiplier: "1x",
    },
    buyIcon:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c72cf2cf4addc19fc813fa73fe3452e8726d89303d1d8277c22f592b830a19c7?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    sellIcon: "",
  },
];
