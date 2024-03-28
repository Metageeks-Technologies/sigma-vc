"use client";
import { IProject } from "@/types/project";
import axios from "axios";
import { useEffect, useState } from "react";
import WithdrawButton from "./components/Button";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

const WithdrawAssets = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [chainName, setChainName] = useState<string | undefined>();
  const { chain: chain } = useAccount();

  useEffect(() => {
    setChainName(chain?.name);
  }, [chain]);

  useEffect(() => {
    const getAllProject = async () => {
      const result = await axios.get("/api/project");
      setProjects(result.data.projects);
    };
    getAllProject();
  }, []);

  return (
    <>
      <h1 className="flex justify-center items-center text-4xl font-bold text-black mb-6 mt-2">
        Withdraw Assets
      </h1>
      <div className="bg-black p-8 rounded-lg max-w-2xl mx-auto my-10">
        {projects.map((project, i) => (
          <div key={i} className="flex justify-between items-center mb-4 p-6">
            <div className="flex-grow">
              <span className="text-gray-300 mr-6">
                P-Name : {project.name}
              </span>
              <br />
              <span className="text-gray-300 mr-6">
                USDT: {project.fundRaisedInUSDT}
              </span>
              <br />
              <span className="text-gray-300 mr-6">
                USDC: {project.fundRaisedInUSDC}
              </span>
            </div>
            <div className="flex-none">
              <WithdrawButton
                WithdrawingIn="USDT"
                chainName={chainName || ""}
                amount={project.fundRaisedInUSDT}
                projectID={project._id}
              />
              <WithdrawButton
                WithdrawingIn="USDC"
                chainName={chainName || ""}
                amount={project.fundRaisedInUSDC}
                projectID={project._id}
              />
            </div>
          </div>
        ))}
        {/* <button
          onClick={withdrawAssets}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none m-2"
        >
          Withdraw USDT
        </button> */}
      </div>
    </>
  );
};

export default WithdrawAssets;
