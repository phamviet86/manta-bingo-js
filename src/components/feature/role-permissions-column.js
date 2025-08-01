// path: @/components/feature/role-permissions-column.js

import {
  buildColumns,
  buildFieldProps,
  buildFormItemProps,
} from "@/utils/column-util";

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
      fieldProps: buildFieldProps({
        disabled: true,
      }),
      formItemProps: buildFormItemProps({
        hidden: true,
      }),
    },
    {
      key: "role_id",
      dataIndex: "role_id",
      title: "Vai trò",
      valueType: "text",
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
    {
      key: "permission_id",
      dataIndex: "permission_id",
      title: "Quyền hạn",
      valueType: "text",
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
  ];

  return buildColumns(schema, columnMapping);
}
