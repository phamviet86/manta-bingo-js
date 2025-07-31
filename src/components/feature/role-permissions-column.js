// path: @/components/feature/role-permissions-column.js

import { buildColumns, fieldProps, formItemProps } from "@/utils/column-util";

export function getRolePermissionsColumn(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      search: false,
      hidden: true,
      fieldProps: fieldProps({
        disabled: true,
      }),
      formItemProps: formItemProps({
        hidden: true,
      }),
    },
    {
      key: "role_id",
      dataIndex: "role_id",
      title: "Vai trò",
      valueType: "text",
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "permission_id",
      dataIndex: "permission_id",
      title: "Quyền hạn",
      valueType: "text",
      formItemProps: formItemProps({
        required: true,
      }),
    },
  ];

  return buildColumns(schema, columnMapping);
}
