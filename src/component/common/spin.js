// path: @/component/common/spin.js

import { Flex, Spin } from "antd";

export function AppSpin() {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Spin size="large" />
    </Flex>
  );
}
