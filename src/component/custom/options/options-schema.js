// path: @/component/custom/options-schema.js

import { renderColumns, renderEnum } from "@/lib/util/render-util";

export function getOptionSchema(params, columnMapping = []) {
  const {} = params || {};

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      valueType: "text",
      sorter: { multiple: 1 },
      search: false,
      width: 80,
    },
    {
      title: "Bảng",
      dataIndex: "option_table",
      key: "option_table",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Cột",
      dataIndex: "option_column",
      key: "option_column",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Nhãn",
      dataIndex: "option_label",
      key: "option_label",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Màu Sắc",
      dataIndex: "option_color",
      key: "option_color",
      valueType: "select",
      valueEnum: COLOR_ENUM,
      sorter: { multiple: 1 },
    },
    {
      title: "Nhóm",
      dataIndex: "option_group",
      key: "option_group",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Nhãn",
      key: "displayLabel",
      search: false,
      render: (_, record) =>
        renderEnum(
          COLOR_ENUM,
          record?.option_color,
          record?.option_label,
          "badge"
        ),
    },
  ];

  return renderColumns(columns, columnMapping);
}
