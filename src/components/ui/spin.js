// path: @/components/ui/spin.js

import { Flex, Spin as AntSpin } from "antd";

export function Spin() {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <AntSpin size="large" />
    </Flex>
  );
}
