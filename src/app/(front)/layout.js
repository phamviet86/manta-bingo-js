"use client";

import dynamic from "next/dynamic";
import { AppSpin, AntProvider } from "@/component/common";
import { MENU_CONFIG } from "@/component/config";
import { useAppContext, AppProvider } from "./provider";
import { Dropdown } from "antd";
import {
  UserOutlined,
  SunOutlined,
  MoonOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useTheme } from "@/component/hook";

const AntLayout = dynamic(
  () => import("@/component/common/layout").then((mod) => mod.AntLayout),
  {
    loading: () => <AppSpin />,
    ssr: false,
  }
);

export default function Layout({ children }) {
  return (
    <AppProvider>
      <LayoutContent>{children}</LayoutContent>
    </AppProvider>
  );
}

function LayoutContent({ children }) {
  const { setThemeMode, modeConfig } = useTheme();

  const themeMenuItems = [
    {
      key: "light",
      icon: <SunOutlined />,
      label: "Giao diện sáng",
      onClick: () => setThemeMode?.("light"),
    },
    {
      key: "dark",
      icon: <MoonOutlined />,
      label: "Giao diện tối",
      onClick: () => setThemeMode?.("dark"),
    },
    {
      key: "auto",
      icon: <ThunderboltOutlined />,
      label: "Tự động",
      onClick: () => setThemeMode?.("auto"),
    },
  ];

  return (
    <AntProvider {...modeConfig}>
      <AntLayout
        menu={MENU_CONFIG}
        avatarProps={{
          icon: <UserOutlined />,
          size: "small",
          title: "Người dùng",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "theme-submenu",
                      label: "Hiển thị",
                      children: themeMenuItems,
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
      >
        {children}
      </AntLayout>
    </AntProvider>
  );
}
