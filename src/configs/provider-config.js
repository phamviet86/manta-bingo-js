// path: @/configs/provider-config.js

import "@fontsource/montserrat";
import viVN from "antd/locale/vi_VN";
import { theme } from "antd";

const { defaultAlgorithm } = theme;

export const PROVIDER_CONFIG = {
  locale: viVN,
  theme: {
    algorithm: defaultAlgorithm,
    token: { fontFamily: "Montserrat, sans-serif" },
  },
  form: {
    validateMessages: {
      required: "Thông tin bắt buộc",
    },
  },
};
