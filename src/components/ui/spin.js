// path: @/components/ui/spin.js

import { Flex, Spin } from "antd";

export function AntSpin() {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Spin size="large" />
    </Flex>
  );
}
