// path: @/components/feature/role-permissions-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function rolePermissionsColumn(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      hideInTable: true,
      hideInDescriptions: true,
      ...buildColumnProps({ disabled: true, hidden: true }),
    },
    {
      key: "role_id",
      dataIndex: "role_id",
      title: "Vai trò",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "permission_id",
      dataIndex: "permission_id",
      title: "Quyền hạn",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const rolePermissionsMapping = {
  default: [],
};
