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
import { Editor } from "@tinymce/tinymce-react";
import { Amarante } from "next/font/google";
import { Accept, useDropzone } from "react-dropzone";
import shortUUID from "short-uuid";
import { uploadLogo } from "@/utils/apiCalls";
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
  const [overView, setOverView] = useState<string>("");
  const [socialMedia, setSocialMedia] = useState([{ platform: "", link: "" }]);
  const [partners, setPartners] = useState([{ name: "", logo: "" }]);
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState<File | null>();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const addSocialMedia = () => {
    setSocialMedia([...socialMedia, { platform: "", link: "" }]);
  };
  const addPartners = () => {
    setPartners([...partners, { name: "", logo: "" }]);
  };
  const handleSocialMediaChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...socialMedia];
    values[index][event.target.name as "platform" | "link"] =
      event.target.value;
    setSocialMedia(values);
  };

  const handlePartnersChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...partners];
    values[index][event.target.name as "name" | "logo"] = event.target.value;
    setPartners(values);
  };

  const listProject = async (e: any) => {
    e.preventDefault();

    if (!logo) return alert("Please upload logo");
    const uuid = shortUUID.generate();
    setLoading(true);

    try {
      const key = await uploadLogo(logo, uuid);
      console.log(key);
      if (key) {
        const response = await axios.post("/api/project", {
          name: formData.name,
          logo: "https://sigma-vc.s3.amazonaws.com/" + key,
          symbol: formData.symbol,
          amountToRaise: formData.amountToRaise,
          totalTokenSupply: formData.totalTokenSupply,
          minimumBuy: formData.minimumBuy,
          maximumBuy: formData.maximumBuy,
          vesting: formData.vesting,
          receiverAddress: formData.receiverAddress,
          socialMedia,
          partners,
          overview: overView,
          chain,
          type,
          startDate,
          endDate,
          uuid,
          listingTokenPrice: (
            Number(formData.amountToRaise) / Number(formData.totalTokenSupply)
          ).toFixed(4),
          currentTokenPrice: (
            Number(formData.amountToRaise) / Number(formData.totalTokenSupply)
          ).toFixed(4),
        });
      }
      setFormData({
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

      setType("");
      setChain("");
      setOverView("");
      setSocialMedia([{ platform: "", link: "" }]);
      setPartners([{ name: "", logo: "" }]);
      setLogo(null);
      setLoading(false);
      alert("Project listed successfully");
    } catch (error) {
      setLoading(false);
    }
    //` ${constant.DB_URL}/projects/createProject`
  };

  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
  } = useDropzone({
    accept: "image/*" as any,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length) setLogo(acceptedFiles[0]);
    },
  });

  return (
    <div className="w-full">
      {/* <ConnectButton /> */}
      <h2 className="w-full p-8 text-4xl font-bold leading-10 text-white max-md:max-w-full">
        Create List
      </h2>
      <div className="bg-neutral-900 w-full p-8 rounded-lg max-w-2xl m-8 relative">
        <form className="space-y-6 w-full ">
          <div className="">
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
          {/* <div className="">
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
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm mb-1 font-medium text-gray-300"
            >
              Logo:
            </label>
            <div
              {...getBannerRootProps()}
              className="mb-4  px-3 py-3 text-white bg-gray-800 rounded "
            >
              <input {...getBannerInputProps()} />
              <p>Drag 'n' drop banner image here, or click to select image</p>
            </div>
            {logo && (
              <div className=" flex gap-2 flex-wrap mt-3">
                <div
                  onClick={() => setLogo(null)}
                  title="Click to remove"
                  className="text-gray-800 text-center flex  cursor-pointer bg-white rounded-[2rem] p-2 px-3"
                >
                  <span className="">{logo.name}</span>
                </div>
              </div>
            )}
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
          {/* <div>
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
              End Date:
            </label>
            <DatePicker date={endDate} setDate={setEndDate} />
          </div> */}
          <div>
            <label htmlFor="title" className="block text-white mb-2">
              Social links:
            </label>
            {socialMedia.map((social, index) => (
              <div key={index} className="flex gap-5 mt-2">
                <input
                  type="text"
                  name="platform"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                  value={social.platform}
                  onChange={(event) => handleSocialMediaChange(index, event)}
                  placeholder="Enter platform"
                  required
                />
                <input
                  type="text"
                  name="link"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white "
                  value={social.link}
                  onChange={(event) => handleSocialMediaChange(index, event)}
                  placeholder="Enter link"
                  required
                />
              </div>
            ))}
            <div className="w-full  flex justify-end my-3">
              <button className="  text-blue-600" onClick={addSocialMedia}>
                Add More
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="title" className="block text-white mb-2">
              Partners && investors:
            </label>
            {partners.map((partner, index) => (
              <div key={index} className="flex gap-5 mt-2">
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                  value={partner.name}
                  onChange={(event) => handlePartnersChange(index, event)}
                  placeholder="Enter name"
                  required
                />
                <input
                  type="text"
                  name="logo"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white "
                  value={partner.logo}
                  onChange={(event) => handlePartnersChange(index, event)}
                  placeholder="Enter logo"
                  required
                />
              </div>
            ))}
            <div className="w-full  flex justify-end my-3">
              <button className="  text-blue-600" onClick={addPartners}>
                Add More
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-white mb-2">
              Overview:
            </label>
            <Editor
              onEditorChange={(content) => setOverView(content)}
              apiKey="5ck4fbg67tr2aopfaf7zp04pl5d1z2xfvv15qu0uunww5ss5"
              init={{
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
              }}
              initialValue="Type here..."
            />
          </div>

          <div className="flex justify-center">
            <button
              disabled={loading}
              type="submit"
              onClick={listProject}
              className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 m-2"
            >
              {loading ? "Loading..." : "List Project"}
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
    </div>
  );
};

export default ListProject;
