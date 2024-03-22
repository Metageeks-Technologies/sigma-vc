import * as React from "react";

interface StatCardProps {
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow w-full text-white bg-white rounded-xl border border-solid shadow border-neutral-500 max-md:mt-6">
        <div className="flex flex-col p-4 bg-neutral-900 max-md:px-5">
          <div className="justify-center px-10 py-2 text-sm font-medium leading-4 max-md:px-5">
            {title}
          </div>
          <div className="self-center mt-8 text-3xl font-bold tracking-tighter leading-10">
            {value}
          </div>
        </div>
        <div className="shrink-0 border-t border-solid bg-neutral-900 border-neutral-500 h-[52px]" />
      </div>
    </div>
  );
};

interface EmptyStateProps {
  title: string;
  imageSrc: string;
  message: string;
}

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
  const stats = [
    { title: "Total Investment", value: "$45,823" },
    { title: "Asset Worth", value: "$45,823" },
    { title: "Unlocked Value", value: "$45,823" },
    { title: "Locked Value", value: "$45,823" },
  ];

  return (
    <div className="flex flex-col px-5">
      <h1 className="w-full text-4xl font-bold leading-10 text-white max-md:max-w-full">
        Dashboard
      </h1>
      <div className="mt-16 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {stats.map((stat) => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} />
          ))}
        </div>
      </div>
      <EmptyState
        title="Portfolio"
        imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/57263eaee1be25e2c9b9347d12091b0db551bbf10ef2540f4c75fae59d8588e2?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
        message="No Project to display at the moment"
      />
      <EmptyState
        title="Transactions"
        imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/cbaa9479f2310a89c5c7152822c2d0888fda69b518a45e688473eba559713263?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
        message="No transaction to display at the moment"
      />
    </div>
  );
}

export default Dashboard;
