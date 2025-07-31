// path: @/components/feature/options-column.js

import { buildColumns, fieldProps, formItemProps } from "@/utils/column-util";

export function getOptionsColumn(params = {}, columnMapping = []) {
  const { optionColor } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      search: false,
      fieldProps: fieldProps({
        disabled: true,
      }),
      formItemProps: formItemProps({
        hidden: true,
      }),
      responsive: ["md"],
      width: 56,
    },
    {
      key: "option_table",
      dataIndex: "option_table",
      title: "Bảng",
      valueType: "text",
      formItemProps: formItemProps({
        required: true,
      }),
      responsive: ["md"],
    },
    {
      key: "option_column",
      dataIndex: "option_column",
      title: "Cột",
      valueType: "text",
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "option_label",
      dataIndex: "option_label",
      title: "Nhãn",
      valueType: "text",
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "option_color",
      dataIndex: "option_color",
      title: "Màu Sắc",
      valueType: "select",
      valueEnum: optionColor || {},
      responsive: ["lg"],
      search: false,
    },
    {
      key: "option_group",
      dataIndex: "option_group",
      title: "Nhóm",
      valueType: "text",
      responsive: ["xl"],
      search: false,
    },
  ];

  return buildColumns(schema, columnMapping);
}
