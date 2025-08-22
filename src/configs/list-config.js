// path: @/configs/list-config.js

export const LIST_CONFIG = {
  pagination: {
    defaultPageSize: 12,
    showSizeChanger: true,
    pageSizeOptions: ["12", "24", "48", "96", "192"],
    hideOnSinglePage: false,
    responsive: true,
    showLessItems: true,
    showQuickJumper: false,
  },
  search: { labelWidth: "auto", filterType: "light" },
  options: {
    reload: true,
    fullScreen: false,
    density: false,
    setting: false,
  },
  grid: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 4,
    xxl: 4,
  },
};
