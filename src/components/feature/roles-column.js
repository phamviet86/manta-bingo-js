// path: @/components/feature/roles-column.js

import { buildColumns } from "@/utils/column-util";

export function getRolesColumn(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      fieldProps: {
        disabled: true,
      },
      formItemProps: {
        style: { display: "none" },
      },
      hidden: true,
    },
    {
      key: "role_name",
      dataIndex: "role_name",
      title: "Vai trò",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      key: "role_path",
      dataIndex: "role_path",
      title: "Đường dẫn",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true }],
      },
    },
  ];

  return buildColumns(schema, columnMapping);
}
