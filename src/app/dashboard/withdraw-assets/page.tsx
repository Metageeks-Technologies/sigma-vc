"use client";
import { IProject } from "@/types/project";
import axios from "axios";
import { useEffect, useState } from "react";
import WithdrawButton from "@/components/WithdrawButton";
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
    <div className=" justify-start ">
      <h2 className="w-full p-8 text-4xl font-bold leading-10 text-white max-md:max-w-full">
        Withdraw Assets
      </h2>

      <div className="bg-neutral-900 p-8 rounded-lg max-w-2xl m-8">
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
      </div>
    </div>
  );
};

export default WithdrawAssets;
