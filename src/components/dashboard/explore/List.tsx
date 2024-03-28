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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function List() {
  const [chainName, setChainName] = useState("");
  const [USDTAddress, setUSDTAddress] = useState<any>("");
  const [projects, setProjects] = useState<IProject[]>([]);
  const dispatch = useAppDispatch();

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
      const result = await axios.get("/api/project");
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
        {/* {projects.map((tokenCard, index) => (
          <TokenCard key={index} {...tokenCard} />
        ))} */}
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow className=" hover:bg-black ">
              <TableHead className="w-[100px]">Item</TableHead>
              <TableHead>Buyers</TableHead>
              <TableHead>Sellers</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={project._id} className="text-white">
                <TableCell className="font-medium">
                  <div className="flex gap-2 text-base font-bold leading-7 text-zinc-400">
                    <img
                      loading="lazy"
                      src={project.logo || ""}
                      alt=""
                      className="shrink-0 self-start w-8 aspect-square"
                    />
                    <div>{project.name || "chain"}</div>
                  </div>
                </TableCell>
                <TableCell className="px-5 ">{project.numberOfBuyer}</TableCell>
                <TableCell>{project.numberOfSeller}</TableCell>
                <TableCell>
                  {" "}
                  ${" "}
                  {project.amountToRaise &&
                    project.totalTokenSupply &&
                    (project.amountToRaise / project.totalTokenSupply).toFixed(
                      2
                    )}{" "}
                </TableCell>

                <TableCell>{project.type}</TableCell>
                <TableCell>
                  ${" "}
                  {project.amountToRaise &&
                    project.totalTokenSupply &&
                    (project.amountToRaise / project.totalTokenSupply).toFixed(
                      2
                    )}{" "}
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <button
                      onClick={(e) => handleBuyClick(e, project)}
                      className="flex flex-1 gap-2 justify-center py-1 rounded-lg max-md:px-5"
                    >
                      <div className="bg-clip-text text-transparent bg-[linear-gradient(86deg,#D16BA5_-14.21%,#BA83CA_15.03%,#9A9AE1_43.11%,#69BFF8_74.29%,#52CFFE_90.94%,#5FFBF1_111.44%)]">
                        Buy
                      </div>
                    </button>
                    <button
                      onClick={(e) => handleSellClick(e, project)}
                      className="flex flex-1 gap-2 justify-center py-1 rounded-lg max-md:px-5"
                    >
                      <div className="bg-clip-text text-transparent bg-[linear-gradient(86deg,#D16BA5_-14.21%,#BA83CA_15.03%,#9A9AE1_43.11%,#69BFF8_74.29%,#52CFFE_90.94%,#5FFBF1_111.44%)]">
                        Sell
                      </div>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default List;

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
