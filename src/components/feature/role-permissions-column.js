// path: @/components/feature/role-permissions-column.js

import { convertColumns } from "@/utils/convert-util";

export function getRolePermissionsColumn(params = {}, columnMapping = []) {
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
      key: "role_id",
      dataIndex: "role_id",
      title: "Vai trò",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      key: "permission_id",
      dataIndex: "permission_id",
      title: "Quyền hạn",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true }],
      },
    },
  ];

  return convertColumns(schema, columnMapping);
}
