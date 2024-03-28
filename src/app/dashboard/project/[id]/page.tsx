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

const page = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [tableData, setTableData] = useState({
    projectName: "",
    askAmount: 0,
    tokenCount: 0,
    investorAddress: "",
  });
  const { id } = useParams();
  const { selectedProject, isBuyOnSaleProject } = useAppSelector(
    (state) => state.uiState
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getInvestment = async () => {
      try {
        const { data } = await axios.get(`/api/investment/${id}`);
        setInvestments(data.investment);
      } catch (error) {
        console.log(error);
      }
    };
    getInvestment();
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
          <div>
            <p> Project Name</p>
            <p>Demo</p>
          </div>
          <div>
            <p>total token supply</p>
            <p>$ dollar</p>
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
            {investments.length > 0 && selectedProject
              ? investments.map((data) => {
                  const tokenCount =
                    (selectedProject.totalTokenSupply * data.investedAmount) /
                    selectedProject.amountToRaise;

                  return (
                    <TableRow key={data._id}>
                      <TableCell className="font-medium">
                        {selectedProject?.name || ""}
                      </TableCell>
                      <TableCell>{data.askAmount}</TableCell>
                      <TableCell>{tokenCount}</TableCell>
                      <TableCell>{data.investorAddress}</TableCell>
                      <TableCell className="text-right">
                        <button
                          className=" cursor-pointer "
                          onClick={() =>
                            handleBuyClick(
                              selectedProject?.name || "",
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
