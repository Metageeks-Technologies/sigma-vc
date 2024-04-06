"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import constants from "@/utils/constants";
import { ethers } from "ethers";
import axios from "axios";
import type { IProject } from "@/types/project";
import { useAppDispatch } from "@/redux/hooks";
import { setBuyProject, setSellPrice } from "@/redux/features/ui/slice";
import { setSelectedProject } from "@/redux/features/ui/slice";
import { useRouter } from "next/navigation";
import { Investment } from "@/types/Investment";
import { useAppSelector } from "@/redux/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { current } from "@reduxjs/toolkit";
import { cn } from "@/lib/utils";

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
  const growthMultiple = Number(
    (project.currentTokenPrice / project.listingTokenPrice).toFixed(2)
  );

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
              $ {project.listingTokenPrice}
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
              {/* {"current price"}{" "} */}$ {project.currentTokenPrice}
              <span
                className={cn(
                  "text-xs  ms-2",
                  growthMultiple < 1 ? "text-red-500" : "text-green-500"
                )}
              >
                {`${growthMultiple}x`}
              </span>
            </div>
            <div className="text-xs leading-4 text-zinc-400">Current price</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TokenCard = ({
  project,
  isInvested,
}: {
  project: IProject;
  isInvested: (projectId: string) => boolean;
}) => {
  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector((state) => state.user);
  const handleClick = () => {
    dispatch(setSelectedProject(project));
  };

  const handleSellClick = (e: React.MouseEvent, project: IProject) => {
    e.stopPropagation();
    dispatch(setSellPrice(true));
    dispatch(setSelectedProject(project));
  };
  const handleBuyClick = (e: React.MouseEvent, project: IProject) => {
    e.stopPropagation();
    dispatch(setBuyProject(true));
    dispatch(setSelectedProject(project));
  };
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const router = useRouter();
  const handleButtonClick = (id: string) => {
    dispatch(setSelectedProject(project));
    router.push(`/dashboard/project/${id}`);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("");
  const changeStatus = async (status: string) => {
    setStatus(status);
    const { data } = await axios.patch(`/api/project/${project._id}`, {
      status,
    });
    project.status = data.investment.status;
    setIsEditing(false);
  };

  return (
    <button
      onClick={() => handleButtonClick(project._id)}
      className="flex flex-col w-[45%] max-md:ml-0 max-md:w-full"
    >
      <div className="flex flex-col grow justify-center p-6 w-full rounded-2xl bg-neutral-900 max-md:px-5 max-md:mt-8 max-md:max-w-full">
        <div className="flex gap-4 justify-between w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-2 text-base font-bold leading-7 text-zinc-400">
            <img
              loading="lazy"
              src={
                project.logo ||
                "https://cdn.builder.io/api/v1/image/assets/TEMP/b68b0cdae57733bdd44ea3de41b7744a0a86c1750bee1107078dfa06a9bccdc0?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
              }
              alt=""
              className="shrink-0 self-start w-8 aspect-square"
            />
            <div onClick={handleClick}>
              {project.name || "chain"}
              <br />
              <span className="text-sm font-medium leading-6 text-zinc-400">
                {project.chain || "subchian"}
              </span>
            </div>
          </div>

          {!isAdmin ? (
            <div className="my-auto text-sm leading-6 text-pink-500">
              {project.status || "status"}
            </div>
          ) : isEditing ? (
            <div className="flex gap-2 justify-center text-sm leading-6 text-white whitespace-nowrap rounded-xl bg-neutral-900">
              <Select value={status} onValueChange={changeStatus}>
                <SelectTrigger className="w-fit mt-1 border-gray-600 bg-gray-800 text-white p-3">
                  <SelectValue
                    placeholder={project?.status || "select status"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NOT LAUNCHED">NOT LAUNCHED</SelectItem>
                  <SelectItem value="PRIVATE">PRIVATE</SelectItem>
                  <SelectItem value="LIVE">LIVE</SelectItem>
                  <SelectItem value="DISTRIBUTING">DISTRIBUTING</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="my-auto text-sm leading-6 text-pink-500">
                {project.status || "status"}
              </div>
              <button onClick={handleEditClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div className="mt-4 max-md:max-w-full">
          <TokenDetails {...project} />
        </div>
        <div className="flex gap-4 mt-4 text-sm font-bold leading-6 text-center whitespace-nowrap max-md:flex-wrap">
          <button
            disabled={
              project.amountToRaise === project.totalRaised ||
              project.status !== "LIVE"
            }
            onClick={(e) => handleBuyClick(e, project)}
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
            <div className="bg-clip-text text-transparent bg-[linear-gradient(86deg,#D16BA5_-14.21%,#BA83CA_15.03%,#9A9AE1_43.11%,#69BFF8_74.29%,#52CFFE_90.94%,#5FFBF1_111.44%)]">
              Buy
            </div>
          </button>
          <button
            disabled={!isInvested(project._id)}
            onClick={(e) => handleSellClick(e, project)}
            className="flex flex-1 gap-2 justify-center px-20 py-1 rounded-lg max-md:px-5"
          >
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
          </button>
        </div>
      </div>
    </button>
  );
};

function Listing({ filterStatus }: { filterStatus: string }) {
  const [chainName, setChainName] = useState("");
  const [USDTAddress, setUSDTAddress] = useState<any>("");
  const [projects, setProjects] = useState<IProject[]>([]);
  const [userInvestments, setUserInvestments] = useState<Investment[]>([]);

  const { walletAddress } = useAppSelector((state) => state.user);

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

    const getInvestments = async () => {
      const result = await axios.get("/api/investment/by-user", {
        params: {
          user_address: walletAddress,
        },
      });
      setUserInvestments(result.data.investments);
      console.log(result, "investments");
    };

    getUSDTAddress();
    getProjects();
    getInvestments();
  }, [USDTAddress, chainName]);

  const getProjects = async () => {
    //         `${constants.DB_URL}/projects/getAllProjects`
    const result = await axios.get("/api/project", {
      params: {
        status: filterStatus,
      },
    });
    setProjects(result.data.projects);
    console.log(result, "projects");
  };

  useEffect(() => {
    getProjects();
  }, [filterStatus]);

  const isInvested = (projectId: string) => {
    return userInvestments.some(
      (investment) => investment.projectID === projectId
    );
  };

  return (
    <div>
      <div className="flex flex-wrap gap-5 max-md:flex-col max-md:gap-0">
        {projects.map((tokenCard, index) => (
          <TokenCard key={index} project={tokenCard} isInvested={isInvested} />
        ))}
      </div>
    </div>
  );
}

export default Listing;
