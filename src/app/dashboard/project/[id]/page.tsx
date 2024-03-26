"use client";
import React, { useState, useEffect } from "react";
import type { Investment } from "@/types/Investment";
import axios from "axios";
import { useParams } from "next/navigation";
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

const page = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const { id } = useParams();
  console.log(id);

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

  return (
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
          {investments.length > 0
            ? investments.map((data) => (
                <TableRow key={data._id}>
                  <TableCell className="font-medium">{data._id}</TableCell>
                  <TableCell>{data.askAmount}</TableCell>
                  <TableCell>{data.investedAmount}</TableCell>
                  <TableCell>{data.investorAddress}</TableCell>
                  <TableCell className="text-right">Buy</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
