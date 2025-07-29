// path: @/component/common/results.js

import { Result as AntResult } from "antd";

export function Result({
  status = "500",
  title = "500",
  subTitle = "Xin lỗi, đã có sự cố xảy ra.",
  ...props
}) {
  return (
    <AntResult {...props} status={status} title={title} subTitle={subTitle} />
  );
}
