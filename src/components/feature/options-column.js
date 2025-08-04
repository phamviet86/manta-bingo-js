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
      ...buildColumnProps({
        disabled: true,
        hidden: true,
        width: 56,
      }),
      search: false,
      responsive: ["md"],
    },
    {
      key: "option_table",
      dataIndex: "option_table",
      title: "Bảng",
      valueType: "text",
      ...buildColumnProps({ required: true }),
      responsive: ["md"],
    },
    {
      key: "option_column",
      dataIndex: "option_column",
      title: "Cột",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "option_label",
      dataIndex: "option_label",
      title: "Nhãn",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "option_color",
      dataIndex: "option_color",
      title: "Màu Sắc",
      valueType: "select",
      ...buildColumnProps({ valueEnum: optionColor }),
      search: false,
      responsive: ["lg"],
    },
    {
      key: "option_group",
      dataIndex: "option_group",
      title: "Nhóm",
      valueType: "text",
      ...buildColumnProps({ search: false }),
      responsive: ["xl"],
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const optionsMapping = {
  default: [],
};
