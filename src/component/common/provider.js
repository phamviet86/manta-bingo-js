// path: @/component/common/config-provider.js

"use client";

import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";

export function AntProvider({ children, ...props }) {
  return <ConfigProvider {...props}>{children}</ConfigProvider>;
}
