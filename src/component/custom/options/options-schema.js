// path: @/component/custom/options-schema.js

import { renderColumns } from "@/lib/util/render-util";

export function getOptionsColumn(params, columnMapping = []) {
  const { optionColor } = params || {};

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
    },
    {
      key: "option_table",
      dataIndex: "option_table",
      title: "Bảng",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      key: "option_column",
      dataIndex: "option_column",
      title: "Cột",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      key: "option_label",
      dataIndex: "option_label",
      title: "Nhãn",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      key: "option_color",
      dataIndex: "option_color",
      title: "Màu Sắc",
      valueType: "select",
      valueEnum: optionColor || {},
    },
    {
      key: "option_group",
      dataIndex: "option_group",
      title: "Nhóm",
      valueType: "text",
    },
  ];

  return renderColumns(schema, columnMapping);
}

export const OPTIONS_MAPPING = [
  {
    key: "id",
    fieldProps: {
      disabled: true,
    },
  },
  { key: "option_table", responsive: ["lg"] },
  { key: "option_column" },
  { key: "displayLabel", hideInDescriptions: true },
  { key: "option_label", hidden: true },
  { key: "option_color", hidden: true },
  { key: "option_group", responsive: ["xl"] },
];
