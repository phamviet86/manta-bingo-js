// path: @/components/ui/provider.js

"use client";

import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd"; 
import { PROVIDER_CONFIG } from "@/configs";

export function Provider({ children, ...props }) {
  return (
    <ConfigProvider {...PROVIDER_CONFIG} {...props}>
      {children}
    </ConfigProvider>
  );
}
