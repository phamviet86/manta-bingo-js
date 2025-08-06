// path: @/components/feature/user-roles-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function userRolesSchema(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
      search: false,
      hideInTable: true,
      hideInDescriptions: true,
    },
    {
      key: "role_name",
      dataIndex: "role_name",
      title: "Vai trò",
      valueType: "text",
      ...buildColumnProps({ rules: [{ required: true }] }),
    },
    {
      key: "role_path",
      dataIndex: "role_path",
      title: "Đường dẫn",
      valueType: "text",
      ...buildColumnProps({ rules: [{ required: true }] }),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const userRolesMapping = {
  fields: [],
  columns: [{ key: "role_name" }, { key: "role_path" }],
};
