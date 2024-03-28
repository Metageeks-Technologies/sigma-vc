import * as React from "react";
import NavItem from "./NavItem";
import type { NavItemProps } from "./NavItem";
import Link from "next/link";
const Sidebar: React.FC = () => {
  return (
    <div className="flex gap-0 mx-auto h-full">
      <aside className="flex flex-col  justify-between items-center px-5 pt-6 pb-20 shadow-sm bg-neutral-950">
        <Link href={"/"}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b68b0cdae57733bdd44ea3de41b7744a0a86c1750bee1107078dfa06a9bccdc0?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
            alt="Logo"
            className="w-10 aspect-square"
          />
        </Link>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fae2159bedf9bb1cad963b3d164e5db81958febfbe60d5877300f309c6988c72?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
          alt="Avatar"
          className="w-10 aspect-[1.25] mt-[500px]"
        />
      </aside>
      <nav className="flex flex-col border-x-[1px] border-zinc-700 grow shrink-0 px-2 py-20 text-sm font-bold leading-6 shadow-sm basis-0 bg-neutral-950 text-zinc-400 w-fit">
        <h2 className="self-start mt-14 ml-4 text-2xl leading-9 text-white">
          General
        </h2>
        {/* <div className="flex flex-col justify-center px-4 py-2 mt-10 w-full text-white whitespace-nowrap bg-neutral-950">
          <div className="flex gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/938431739d34ec419a97ebdb9928580782363b23969e32d3b5fd3cfe91b529b4?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
              alt="Dashboard Icon"
              className="shrink-0 w-6 aspect-square"
            />
            <div className="flex-auto">Dashboard</div>
          </div>
        </div> */}
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            link={item.link}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

const navItems: NavItemProps[] = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/938431739d34ec419a97ebdb9928580782363b23969e32d3b5fd3cfe91b529b4?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    label: "Dashboard",
    link: "/dashboard",
  },
  // {
  //   icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a15415a290cb12d0ed5aaeb2c403d4dda5301873212ffdbf98be7865ac13c12?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
  //   label: "Portfolio",
  //   link: "/dashboard/portfolio",
  // },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a15415a290cb12d0ed5aaeb2c403d4dda5301873212ffdbf98be7865ac13c12?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    label: "Projects",
    link: "/dashboard/project",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a15415a290cb12d0ed5aaeb2c403d4dda5301873212ffdbf98be7865ac13c12?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    label: "Explore",
    link: "/dashboard/explore",
  },
  // {
  //   icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a15415a290cb12d0ed5aaeb2c403d4dda5301873212ffdbf98be7865ac13c12?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
  //   label: "My Listings",
  //   link: "/dashboard/my-listings",
  // },
  // {
  //   icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/89884b77994a6d75b7ce2f6e3d09bc829c3bb2b286f7cf635a4590499ee32bae?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
  //   label: "Offers",
  //   link: "/dashboard/offers",
  // },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/89884b77994a6d75b7ce2f6e3d09bc829c3bb2b286f7cf635a4590499ee32bae?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    label: "Create Listing",
    link: "/dashboard/create-list",
  },
];
