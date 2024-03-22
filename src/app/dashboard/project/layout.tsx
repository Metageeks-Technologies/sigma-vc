import type { Metadata } from "next";
import Header from "@/components/dashboard/project/Header";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects Dashboard for Sigma VC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4 py-6 flex flex-col ">
      <Header />
      {children}
    </div>
  );
}
