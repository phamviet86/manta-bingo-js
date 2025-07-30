// path: @/configs/enum-config.js

export const COLOR_ENUM = {
  // Status group (sorted alphabetically)
  default: {
    text: "Default",
    status: "default",
    color: "grey",
  },
  error: {
    text: "Error",
    status: "error",
    color: "red",
  },
  processing: {
    text: "Processing",
    status: "processing",
    color: "blue",
  },
  success: {
    text: "Success",
    status: "success",
    color: "green",
  },
  warning: {
    text: "Warning",
    status: "warning",
    color: "orange",
  },

  // Color group (sorted alphabetically)

  blue: {
    text: "Blue",
    color: "blue",
  },
  cyan: {
    text: "Cyan",
    color: "cyan",
  },
  geekblue: {
    text: "Geekblue",
    color: "geekblue",
  },
  gold: {
    text: "Gold",
    color: "gold",
  },
  green: {
    text: "Green",
    color: "green",
  },
  grey: {
    text: "Grey",
    color: "grey",
  },
  lime: {
    text: "Lime",
    color: "lime",
  },
  magenta: {
    text: "Magenta",
    color: "magenta",
  },
  orange: {
    text: "Orange",
    color: "orange",
  },
  pink: {
    text: "Pink",
    color: "pink",
  },
  purple: {
    text: "Purple",
    color: "purple",
  },
  red: {
    text: "Red",
    color: "red",
  },
  volcano: {
    text: "Volcano",
    color: "volcano",
  },
  yellow: {
    text: "Yellow",
    color: "yellow",
  },
};

export const RESOURCE_METHOD_ENUM = {
  GET: { text: "GET", color: "green" },
  POST: { text: "POST", color: "blue" },
  PUT: { text: "PUT", color: "orange" },
  DELETE: { text: "DELETE", color: "red" },
  PATCH: { text: "PATCH", color: "purple" },
};

export const ENROLLMENT_STATUS_ENUM = {
  "Nhập sai ngày": { text: "Nhập sai ngày", status: "error" },
  "Chờ xếp lớp": { text: "Chờ xếp lớp", status: "warning" },
  "Thiếu ngày": { text: "Thiếu ngày", status: "error" },
  "Đã xếp lớp": { text: "Đã xếp lớp", status: "success" },
  "Đang học": { text: "Đang học", status: "processing" },
  "Đang dạy": { text: "Đang dạy", status: "processing" },
  "Đã kết thúc": { text: "Đã kết thúc", status: "default" },
};
