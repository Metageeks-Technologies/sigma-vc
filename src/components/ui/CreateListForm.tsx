"use client";
import { useState } from "react";
import axios from "axios";
import constant from "../../utils/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "./DatePicker";

// import ConnectButton from "../components/connectButton";

const ListProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    amountToRaise: "",
    totalTokenSupply: "",
    minimumBuy: "",
    maximumBuy: "",
    vesting: "",
    receiverAddress: "",
    logo: "",
    symbol: "",
  });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [type, setType] = useState<string>();
  const [chain, setChain] = useState<string>();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const listProject = (e: any) => {
    e.preventDefault();

    console.log({
      name: formData.name,
      logo: formData.logo,
      symbol: formData.symbol,
      amountToRaise: formData.amountToRaise,
      totalTokenSupply: formData.totalTokenSupply,
      minimumBuy: formData.minimumBuy,
      maximumBuy: formData.maximumBuy,
      vesting: formData.vesting,
      receiverAddress: formData.receiverAddress,
      chain,
      type,
      startDate,
      endDate,
    });
    //` ${constant.DB_URL}/projects/createProject`
    axios
      .post("/api/project", {
        name: formData.name,
        logo: formData.logo,
        symbol: formData.symbol,
        amountToRaise: formData.amountToRaise,
        totalTokenSupply: formData.totalTokenSupply,
        minimumBuy: formData.minimumBuy,
        maximumBuy: formData.maximumBuy,
        vesting: formData.vesting,
        receiverAddress: formData.receiverAddress,
        chain,
        type,
        startDate,
        endDate,
      })
      .then((response) => {
        console.log(response);
        alert("Project listed successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* <ConnectButton /> */}
      <h1 className="flex items-center justify-center text-4xl font-bold text-black mb-6 mt-2">
        List Project
      </h1>
      <div className="bg-black p-8 rounded-lg max-w-2xl mx-auto my-10 relative">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
            />
          </div>
          <div>
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-300"
            >
              Logo:
            </label>
            <input
              type="text"
              name="logo"
              id="logo"
              value={formData.logo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
            />
          </div>
          <div>
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-300"
            >
              Symbol:
            </label>
            <input
              type="text"
              name="symbol"
              id="symbol"
              value={formData.symbol}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
            />
          </div>
          <div>
            <label
              htmlFor="amountToRaise"
              className="block text-sm font-medium text-gray-300"
            >
              Amount to Raise:
            </label>
            <input
              type="text"
              name="amountToRaise"
              id="amountToRaise"
              value={formData.amountToRaise}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500  p-3"
            />
          </div>
          <div>
            <label
              htmlFor="totalTokenSupply"
              className="block text-sm font-medium text-gray-300"
            >
              Total Token Supply:
            </label>
            <input
              type="text"
              name="totalTokenSupply"
              id="totalTokenSupply"
              value={formData.totalTokenSupply}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500  p-3"
            />
          </div>
          <div>
            <label
              htmlFor="minimumBuy"
              className="block text-sm font-medium text-gray-300"
            >
              Minimum Buy Amount:
            </label>
            <input
              type="text"
              name="minimumBuy"
              id="minimumBuy"
              value={formData.minimumBuy}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500  p-3"
            />
          </div>
          <div>
            <label
              htmlFor="maximumBuy"
              className="block text-sm font-medium text-gray-300"
            >
              Maximum Buy Amount:
            </label>
            <input
              type="text"
              name="maximumBuy"
              id="maximumBuy"
              value={formData.maximumBuy}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500  p-3"
            />
          </div>

          <div>
            <label
              htmlFor="vesting"
              className="block text-sm font-medium text-gray-300"
            >
              Vesting:
            </label>
            <input
              type="text"
              name="vesting"
              id="vesting"
              value={formData.vesting}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500  p-3"
            />
          </div>
          <div>
            <label
              htmlFor="receiverAddress"
              className="block text-sm font-medium text-gray-300"
            >
              Address you want to receive funds after target achieved:
            </label>
            <input
              type="text"
              name="receiverAddress"
              id="receiverAddress"
              value={formData.receiverAddress}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500  p-3"
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-300"
            >
              Type:
            </label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full mt-1  bg-gray-800 text-white p-3">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ICO">ICO</SelectItem>
                <SelectItem value="IDO">IDO</SelectItem>
                <SelectItem value="SEED">SEED</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-300"
            >
              Chain:
            </label>
            <Select value={chain} onValueChange={setChain}>
              <SelectTrigger className="w-full mt-1 border-gray-600 bg-gray-800 text-white p-3">
                <SelectValue placeholder="Select Chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BSC">BSC</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-300"
            >
              Start Date:
            </label>
            <DatePicker date={startDate} setDate={setStartDate} />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-300"
            >
              Start Date:
            </label>
            <DatePicker date={endDate} setDate={setEndDate} />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              onClick={listProject}
              className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 m-2"
            >
              List Project
            </button>
            {/* <button
              type="submit"
              className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 m-2"
              onClick={() => navigate("/listed-projects")}
            >
              View Listed Project
            </button> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default ListProject;
