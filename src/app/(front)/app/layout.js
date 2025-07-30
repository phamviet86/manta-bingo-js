"use client";

import dynamic from "next/dynamic";
import { Spin, Provider } from "@/components/ui";
import { AppProvider } from "../provider";

const Layout = dynamic(
  () => import("@/components/ui/layout").then((mod) => mod.Layout),
  {
    loading: () => <Spin />,
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
    <Provider>
      <Layout>{children}</Layout>
    </Provider>
  );
}
