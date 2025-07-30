"use client";

import dynamic from "next/dynamic";
import { AntSpin, AntProvider } from "@/components/ui";
import { AppProvider } from "../provider";

const AntLayout = dynamic(
  () => import("@/components/ui/layout").then((mod) => mod.AntLayout),
  {
    loading: () => <AntSpin />,
    ssr: false,
  }
);

export default function AppLayout({ children }) {
  return (
    <AppProvider>
      <LayoutContent>{children}</LayoutContent>
    </AppProvider>
  );
}

function LayoutContent({ children }) {
  return (
    <AntProvider>
      <AntLayout>{children}</AntLayout>
    </AntProvider>
  );
}
