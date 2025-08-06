// path: @/components/feature/options-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function optionsColumn(params = {}, columnMapping = []) {
  const { optionColor } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
    },
    {
      key: "option_table",
      dataIndex: "option_table",
      title: "Bảng",
      valueType: "text",
      ...buildColumnProps({ rules: [{ required: true }] }),
    },
    {
      key: "option_column",
      dataIndex: "option_column",
      title: "Cột",
      valueType: "text",
      ...buildColumnProps({ rules: [{ required: true }] }),
    },
    {
      key: "option_label",
      dataIndex: "option_label",
      title: "Nhãn",
      valueType: "text",
      ...buildColumnProps({ rules: [{ required: true }] }),
    },
    {
      key: "option_color",
      dataIndex: "option_color",
      title: "Màu Sắc",
      valueType: "select",
      ...buildColumnProps({ valueEnum: optionColor }),
    },
    {
      key: "option_group",
      dataIndex: "option_group",
      title: "Nhóm",
      valueType: "text",
      ...buildColumnProps({}),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const optionsMapping = {
  default: [
    { key: "id", width: 56, search: false, responsive: ["md"] },
    { key: "option_table", responsive: ["md"] },
    { key: "option_column" },
    { key: "option_label" },
    { key: "option_color", search: false, responsive: ["lg"] },
    { key: "option_group", search: false, responsive: ["xl"] },
  ],
  fields: [
    { key: "id" },
    { key: "option_table" },
    { key: "option_column" },
    { key: "option_label" },
    { key: "option_color" },
    { key: "option_group" },
  ],
};
