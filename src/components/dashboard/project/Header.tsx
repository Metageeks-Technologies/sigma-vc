import * as React from "react";

interface TabProps {
  label: string;
  isActive?: boolean;
}

const Tab: React.FC<TabProps> = ({ label, isActive = false }) => {
  return (
    <div
      className={`self-stretch my-auto px-4 py-3 whitespace-nowrap rounded-2xl ${
        isActive
          ? "justify-center text-white bg-[linear-gradient(86deg,#D16BA5_-14.21%,#BA83CA_15.03%,#9A9AE1_43.11%,#69BFF8_74.29%,#52CFFE_90.94%,#5FFBF1_111.44%)]"
          : ""
      }`}
    >
      {label}
    </div>
  );
};

const Header: React.FC = () => {
  const tabs = [
    { label: "All", isActive: true },
    { label: "Not Launched" },
    { label: "Live" },
    { label: "Distributing" },
    { label: "Completed" },
  ];

  return (
    <section className="flex flex-col px-5 font-bold max-w-[558px]">
      <h2 className="w-full text-4xl leading-10 text-white max-md:max-w-full">
        Projects
      </h2>
      <div className="flex flex-col justify-center px-2 py-1 mt-10 w-full text-base leading-6 rounded-2xl bg-neutral-900 text-stone-200 max-md:max-w-full">
        <div className="flex gap-3.5 justify-between items-center max-md:flex-wrap">
          {tabs.map((tab) => (
            <Tab key={tab.label} label={tab.label} isActive={tab.isActive} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Header;
