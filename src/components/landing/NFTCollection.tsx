import * as React from "react";

interface NFTCardProps {
  name: string;
  imageSrc: string;
  imageAlt: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ name, imageSrc, imageAlt }) => (
  <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
    <div className="flex flex-col grow justify-center py-px w-full text-center whitespace-nowrap rounded border border-gray-800 border-solid shadow-lg bg-zinc-900 max-md:mt-10">
      <div className="justify-center items-center px-16 py-4 text-sm leading-6 text-white border-b border-gray-800 border-solid max-md:px-5">
        {name}
      </div>
      <img src={imageSrc} alt={imageAlt} className="w-full aspect-[0.94]" />
      <div className="flex justify-center items-center px-16 py-4 text-xs leading-4 text-blue-200 border-t border-gray-800 border-solid max-md:px-5">
        <div className="flex gap-2">
          <div className="my-auto">Buy</div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ecc0f6926568775812cb615e006e8b64d3e13a0358be8c16cc7e4f07a0199f7?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
            alt="Buy icon"
            className="shrink-0 w-5 aspect-square"
          />
        </div>
      </div>
    </div>
  </div>
);

const NFTCollectionSection: React.FC = () => {
  const nftData = [
    {
      name: "Tirones",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c399c2012d86b1f1de0cf51f20720dd8c25efab72777bbf026816ab93ac402b5?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      imageAlt: "Tirones NFT",
    },
    {
      name: "Principa",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/41da8304314e8f081b09f350a6a0a17aece19c5a56e4a9fb7c2822cabee1f128?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      imageAlt: "Principa NFT",
    },
    {
      name: "Centuri",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c594b6fec0af21e3ea751909818db5d3a6292faa64f5201d68951cfff0984c51?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      imageAlt: "Centuri NFT",
    },
    {
      name: "Primus",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d4480427e7e05c09b7815fb0506b72ccb4bc1137918d461102f7e001b1e61d05?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      imageAlt: "Primus NFT",
    },
  ];

  return (
    <section className="flex justify-center items-center px-16 py-16 max-md:px-5">
      <div className="flex flex-col items-center mt-6 max-w-full w-[1280px]">
        <h2 className="text-base tracking-widest leading-5 text-center uppercase text-red-500">
          NFT COLLECTION
        </h2>
        <h1 className="mt-16 text-5xl text-center text-white leading-[58px] max-md:mt-10 max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
          Unparalleled investments <br /> opportunities
        </h1>
        <p className="mt-14 text-xl leading-8 text-center text-gray-300 max-md:mt-10 max-md:max-w-full">
          Instead, holders of the Legion NFT Collection will be able to access
          high- <br /> quality allocations in high-quality projects.
        </p>
        <div className="self-stretch mt-20 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {nftData.map((nft, index) => (
              <NFTCard
                key={index}
                name={nft.name}
                imageSrc={nft.imageSrc}
                imageAlt={nft.imageAlt}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NFTCollectionSection;
