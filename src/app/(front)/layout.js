"use client";

import dynamic from "next/dynamic";
import { AppSpin, AntProvider } from "@/component/common";
import { DARK_MODE, LIGHT_MODE, MENU_CONFIG } from "@/component/config";

const AntLayout = dynamic(
  () => import("@/component/common/layout").then((mod) => mod.AntLayout),
  {
    loading: () => <AppSpin />,
    ssr: false,
  }
);

export default function Layout({ children }) {
  return <LayoutContent>{children}</LayoutContent>;
}

function LayoutContent({ children }) {
  return (
    <AntProvider {...DARK_MODE}>
      <AntLayout menu={MENU_CONFIG}>{children}</AntLayout>
    </AntProvider>
  );
}
