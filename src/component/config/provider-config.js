// path: @/component/config/provider-config.js

import "@fontsource/montserrat";
import viVN from "antd/locale/vi_VN";
import { theme } from "antd";

const { darkAlgorithm, defaultAlgorithm } = theme;

// You can make this dynamic by exporting a function instead
export const getProviderConfig = (isDark = false) => ({
  locale: viVN,
  theme: {
    algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
    token: { fontFamily: "Montserrat, sans-serif" },
  },
  form: {
    validateMessages: {
      required: "Thông tin bắt buộc",
    },
  },
});
