// path: @/components/feature/user-roles-column.js

import {
  buildColumns,
  buildFieldProps,
  buildFormItemProps,
} from "@/utils/column-util";

export function getUserRolesColumn(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      fieldProps: buildFieldProps({
        disabled: true,
      }),
      formItemProps: buildFormItemProps({
        hidden: true,
      }),
      search: false,
      hidden: true,
      hideInDescriptions: true,
    },
    {
      key: "user_id",
      dataIndex: "user_id",
      title: "Người dùng",
      valueType: "text",
      formItemProps: buildFormItemProps({
        required: true,
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
  ];

  return buildColumns(schema, columnMapping);
}
