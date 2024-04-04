"use client";
import React, { useState, useEffect } from "react";
import type { Investment } from "@/types/Investment";
import axios from "axios";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
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
import { useAppSelector } from "@/redux/hooks";
import { setBuyOnSaleProject } from "@/redux/features/ui/slice";
import BuyOnSaleProject from "@/components/ui/popup/BuyOnSaleProject";
import { IProject } from "@/types/project";

const page = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [currProject, setCurrProject] = useState<IProject | null>(null);
  const [tableData, setTableData] = useState({
    projectName: "",
    askAmount: 0,
    tokenCount: 0,
    investorAddress: "",
  });
  const { id } = useParams();
  const { isBuyOnSaleProject } = useAppSelector((state) => state.uiState);
  const dispatch = useAppDispatch();

  console.log(currProject, "currProject");

  useEffect(() => {
    const getCurrentProject = async () => {
      try {
        const { data } = await axios.get(`/api/project/${id}`);
        setCurrProject(data.project);
      } catch (error) {
        console.log(error);
      }
    };
    const getInvestment = async () => {
      try {
        const { data } = await axios.get(`/api/investment/${id}`);
        setInvestments(data.investment);
      } catch (error) {
        console.log(error);
      }
    };
    getInvestment();
    getCurrentProject();
  }, []);

  const handleBuyClick = (
    projectName: string,
    askAmount: number,
    tokenCount: number,
    investorAddress: string
  ) => {
    setTableData({
      projectName,
      askAmount,
      tokenCount,
      investorAddress,
    });
    dispatch(setBuyOnSaleProject(true));
  };

  return (
    <>
      <div className="text-white">
        <div className="flex gap-5 p-5">
          <img
            loading="lazy"
            src={
              currProject?.logo ||
              "https://cdn.builder.io/api/v1/image/assets/TEMP/b68b0cdae57733bdd44ea3de41b7744a0a86c1750bee1107078dfa06a9bccdc0?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
            }
            alt=""
            className="shrink-0 self-start w-8 aspect-square"
          />
          <div>
            <p> Project Name</p>
            <p>{currProject?.name || ""}</p>
          </div>
          <div>
            <p>total token supply</p>
            <p>
              ${" "}
              {currProject &&
                currProject.amountToRaise &&
                currProject.totalTokenSupply &&
                (
                  currProject.amountToRaise / currProject.totalTokenSupply
                ).toFixed(2)}{" "}
            </p>
          </div>
          <div className="flex flex-col items-start py-2 pr-20 pl-4 text-center whitespace-nowrap shadow-sm bg-neutral-900 max-md:pr-5">
            <div className="text-sm font-bold leading-6 text-white">
              {currProject?.numberOfBuyer || 0}
            </div>
            <div className="text-xs leading-4 text-zinc-400">Buyers</div>
          </div>
          <div className="flex flex-col items-start py-2 pr-20 pl-4 text-center whitespace-nowrap shadow-sm bg-neutral-900 max-md:pr-5">
            <div className="text-sm font-bold leading-6 text-white">
              {currProject?.numberOfSeller || 0}
            </div>
            <div className="text-xs leading-4 text-zinc-400">Sellers</div>
          </div>
          <div className="flex flex-col items-start py-2 pr-20 pl-4 text-center whitespace-nowrap shadow-sm bg-neutral-900 max-md:pr-5">
            <div className="text-sm font-bold leading-6 text-white">
              {currProject?.totalRaised || 0}
            </div>
            <div className="text-xs leading-4 text-zinc-400">
              Total amount raised
            </div>
          </div>
          <div className="flex flex-col items-start py-2 pr-20 pl-4 text-center whitespace-nowrap shadow-sm bg-neutral-900 max-md:pr-5">
            <div className="text-sm font-bold leading-6 text-white">
              {currProject?.status || 0}
            </div>
            <div className="text-xs leading-4 text-zinc-400">status</div>
          </div>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Item</TableHead>
              <TableHead>Asking Amount</TableHead>
              <TableHead>Token amount</TableHead>
              <TableHead>From</TableHead>

              <TableHead className="text-right">Buy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investments.length > 0 && currProject
              ? investments.map((data) => {
                  const tokenCount =
                    (currProject.totalTokenSupply * data.investedAmount) /
                    currProject.amountToRaise;

                  return (
                    <TableRow key={data._id}>
                      <TableCell className="font-medium">
                        {currProject?.name || ""}
                      </TableCell>
                      <TableCell>{data.askAmount}</TableCell>
                      <TableCell>{tokenCount}</TableCell>
                      <TableCell>{data.investorAddress}</TableCell>
                      <TableCell className="text-right">
                        <button
                          className=" cursor-pointer "
                          onClick={() =>
                            handleBuyClick(
                              currProject?.name || "",
                              data.askAmount,
                              tokenCount,
                              data.investorAddress
                            )
                          }
                        >
                          Buy
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </div>
      {isBuyOnSaleProject && <BuyOnSaleProject tableData={tableData} />}
    </>
  );
};

export default page;
