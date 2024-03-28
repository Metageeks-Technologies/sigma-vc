import * as React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface SocialIconProps {
  src: string;
  alt: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ src, alt }) => (
  <img
    loading="lazy"
    src={src}
    alt={alt}
    className="shrink-0 w-6 aspect-square"
  />
);

const Header: React.FC = () => (
  <div className="flex border-b-[1px] border-zinc-700 gap-5 justify-between px-8 py-2 backdrop-blur-2xl bg-neutral-950 max-md:flex-wrap max-md:px-5">
    <div className="flex gap-4 my-auto">
      {socialIcons.map((icon, index) => (
        <SocialIcon key={index} src={icon.src} alt={icon.alt} />
      ))}
    </div>
    <div className="flex flex-col justify-center px-4 py-3 text-sm font-bold leading-6 text-white whitespace-nowrap rounded-xl bg-neutral-900">
      <div className=" flex justify-center items-center">
        <ConnectButton />
      </div>
    </div>
  </div>
);

export default Header;

const socialIcons = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/212d82614336e06c2c06d62e5b50821f3286a6d8a305e971ceec324922d08356?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    alt: "Social icon 1",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/03f6cdc1a7053159dd9f4981214048a23eb18e51d2e42ce10f4b59382de16221?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    alt: "Social icon 2",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0ae8eea28c566c64f3a1617d14ebd7e5d4e5de632f45c28947fa98ed81854d69?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    alt: "Social icon 3",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/549225cb5763c5fa0a2bfd6e9ab5cbf38888068f367d2f9bc35efcf79097dd45?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    alt: "Social icon 4",
  },
];
