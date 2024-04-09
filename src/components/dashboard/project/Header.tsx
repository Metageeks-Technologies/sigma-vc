import * as React from "react";

interface TabProps {
  label: string;
  isActive?: boolean;
  setFilter: (label: string) => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, setFilter }) => {
  return (
    <div
      onClick={() => setFilter(label)}
      className={`self-stretch cursor-pointer my-auto px-4 py-3 whitespace-nowrap rounded-2xl ${
        isActive
          ? "justify-center text-white bg-[linear-gradient(86deg,#D16BA5_-14.21%,#BA83CA_15.03%,#9A9AE1_43.11%,#69BFF8_74.29%,#52CFFE_90.94%,#5FFBF1_111.44%)]"
          : ""
      }`}
    >
      {label}
    </div>
  );
};

const Header = ({
  setFilterStatus,
  filterStatus,
}: {
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  filterStatus: string;
}) => {
  const tabs = [
    { label: "ALL" },
    { label: "NOT LAUNCHED" },
    { label: "PRIVATE" },
    { label: "DISTRIBUTING" },
    { label: "LIVE" },
  ];

  const setFilter = (label: string) => {
    setFilterStatus(label);
  };

  return (
    <section className="flex mb-10 flex-col font-bold w-fit">
      <h2 className="w-full text-4xl leading-10 text-white max-md:max-w-full">
        Projects
      </h2>
      <div className="flex flex-col justify-center px-2 py-1 mt-10 w-full text-base leading-6 rounded-2xl bg-neutral-900 text-stone-200 max-md:max-w-full">
        <div className="flex gap-3.5 justify-between items-center max-md:flex-wrap">
          {tabs.map((tab) => (
            <Tab
              setFilter={setFilter}
              key={tab.label}
              label={tab.label}
              isActive={tab.label === filterStatus}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Header;
