"use client";
import type { Investment } from "@/types/Investment";
import type { IProject } from "@/types/project";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
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

interface StatCardProps {
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full border rounded-xl border-solid shadow border-neutral-500">
      <div className="flex flex-col grow w-full text-white bg-white rounded-xl  max-md:mt-6">
        <div className="flex flex-col p-4 bg-neutral-900 max-md:px-5 rounded-xl">
          <div className="justify-center text-center px-10 py-2 text-sm font-medium leading-4 max-md:px-5">
            {title}
          </div>
          <div className="self-center mt-8 text-3xl font-bold tracking-tighter leading-10">
            {value}
          </div>
        </div>
        {/* <div className="shrink-0 border-t border-solid bg-neutral-900 border-neutral-500 h-[52px]" /> */}
      </div>
    </div>
  );
};

interface EmptyStateProps {
  title: string;
  imageSrc: string;
  message: string;
}
type TCustomProject = {
  _id: string;
  name: string;
  logo: string;
  currentTokenPrice: number;
  listingTokenPrice: number;
  chain: string;
  type: string;
  updatedAt: string;
};

type CustomInvestment = Investment & { projectID: TCustomProject };

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  imageSrc,
  message,
}) => {
  return (
    <section className="flex flex-col items-center pt-4 pr-20 pb-11 pl-4 mt-16 w-full text-white bg-neutral-900 max-md:pr-5 max-md:mt-10 max-md:max-w-full">
      <h2 className="self-start text-2xl font-bold tracking-tight leading-7 max-md:max-w-full">
        {title}
      </h2>
      <img
        src={imageSrc}
        alt=""
        className="mt-8 max-w-full aspect-square w-[108px]"
      />
      <p className="mt-2 text-lg font-semibold leading-7">{message}</p>
    </section>
  );
};

function Dashboard() {
  const { walletAddress } = useAppSelector((state) => state.user);
  const [userInvestment, setUserInvestment] = useState<CustomInvestment[]>([]);

  useEffect(() => {
    const fetchUserInvestment = async () => {
      const { data } = await axios("/api/investment/by-user-populate-project", {
        params: {
          user_address: walletAddress,
        },
      });
      // console.log(data.investments);
      setUserInvestment(data.investments);
    };

    fetchUserInvestment();
  }, [walletAddress]);

  const totalBoughtAmount = userInvestment.reduce(
    (sum, investment) => sum + investment.boughtAmount,
    0
  );
  const totalWorthAmount = userInvestment.reduce(
    (sum, investment) =>
      // sum + investment.investedAmount * investment.projectID.currentTokenPrice,
      sum + investment.investedAmount / investment.projectID.listingTokenPrice,
    0
  );
  const stats = [
    {
      title: "Total Investment",
      value: totalBoughtAmount ? ` $${totalBoughtAmount}` : "$0",
    },
    {
      title: "Receivable Token",
      value: totalWorthAmount ? `${totalWorthAmount.toFixed(2)}` : "0",
    },
    // { title: "Unlocked Value", value: "$45,823" },
    // { title: "Locked Value", value: "$45,823" },
  ];

  function formatDate(d: string) {
    const date = new Date(d);

    return date.toLocaleDateString();
  }

  return (
    <div className="flex flex-col px-5">
      <h1 className="w-full text-4xl font-bold leading-10 text-white max-md:max-w-full">
        Dashboard
      </h1>
      <div className="mt-16 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between max-md:flex-col max-md:gap-0">
          {stats.map((stat) => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} />
          ))}
        </div>
      </div>
      {/* <EmptyState
        title="Portfolio"
        imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/57263eaee1be25e2c9b9347d12091b0db551bbf10ef2540f4c75fae59d8588e2?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
        message="No Project to display at the moment"
      /> */}
      <section className="flex flex-col items-center pt-4 pr-20 pb-11 pl-4 mt-16 w-full text-white bg-neutral-900 max-md:pr-5 max-md:mt-10 max-md:max-w-full">
        <h2 className="self-start text-2xl mb-4 font-bold tracking-tight leading-7 max-md:max-w-full">
          Portfolio
        </h2>
        {userInvestment.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className=" hover:bg-black ">
                <TableHead className="">Index</TableHead>
                <TableHead className="">Project</TableHead>
                <TableHead>Chain</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Token Amount</TableHead>
                <TableHead>Invested Amount</TableHead>
                <TableHead>Invested Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userInvestment.map((I, index) => (
                <TableRow key={I.projectID._id} className="text-white">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex gap-2 text-base font-bold leading-7 text-zinc-400">
                      <img
                        loading="lazy"
                        src={
                          I.projectID.logo ||
                          "https://cdn.builder.io/api/v1/image/assets/TEMP/b68b0cdae57733bdd44ea3de41b7744a0a86c1750bee1107078dfa06a9bccdc0?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
                        }
                        alt=""
                        className="shrink-0 self-start w-8 aspect-square"
                      />
                      <div>{I.projectID.name || "chain"}</div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 ">{I.projectID.chain}</TableCell>
                  <TableCell>{I.projectID.type}</TableCell>
                  <TableCell>
                    {(I.investedAmount / I.projectID.listingTokenPrice).toFixed(
                      2
                    )}
                  </TableCell>
                  <TableCell>{I.boughtAmount}</TableCell>
                  <TableCell>{formatDate(I.projectID.updatedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <>
            <img
              src={
                "https://cdn.builder.io/api/v1/image/assets/TEMP/57263eaee1be25e2c9b9347d12091b0db551bbf10ef2540f4c75fae59d8588e2?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
              }
              alt=""
              className="mt-8 max-w-full aspect-square w-[108px]"
            />
            <p className="mt-2 text-lg font-semibold leading-7">
              {"No Project to display at the moment"}
            </p>
          </>
        )}
      </section>

      {/* <EmptyState
        title="Transactions"
        imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/cbaa9479f2310a89c5c7152822c2d0888fda69b518a45e688473eba559713263?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
        message="No transaction to display at the moment"
      /> */}
    </div>
  );
}

export default Dashboard;
