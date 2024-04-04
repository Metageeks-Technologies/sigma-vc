import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects Dashboard for Sigma VC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="px-4 py-6 flex flex-col ">{children}</div>;
}
