import type { Metadata } from "next";
import Sidebar from "@/components/ui/Sidebar/Sidebar";
import Header from "@/components/ui/DashHeader/Header";
import Footer from "@/components/ui/DashFooter/Footer";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User Dashboard for Sigma VC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex  w-full min-h-screen bg-black">
      <div className="w-[25%]">
        <Sidebar />
      </div>
      <div className="w-[85%] flex flex-col bg-black">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
