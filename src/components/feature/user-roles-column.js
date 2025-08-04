// path: @/components/feature/user-roles-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function userRolesColumn(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
      hideInTable: true,
      hideInDescriptions: true,
    },
    {
      key: "role_name",
      dataIndex: "role_name",
      title: "Vai trò",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "role_path",
      dataIndex: "role_path",
      title: "Đường dẫn",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const userRolesMapping = {
  default: [],
};
