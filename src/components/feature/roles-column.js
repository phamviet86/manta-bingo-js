// path: @/components/feature/roles-column.js

import {
  buildColumns,
  buildFieldProps,
  buildFormItemProps,
} from "@/utils/column-util";

export function getRolesColumn(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      search: false,
      fieldProps: buildFieldProps({
        disabled: true,
      }),
      formItemProps: buildFormItemProps({
        hidden: true,
      }),
      responsive: ["md"],
      width: 56,
    },
    {
      key: "role_name",
      dataIndex: "role_name",
      title: "Vai trò",
      valueType: "text",
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
    {
      key: "role_path",
      dataIndex: "role_path",
      title: "Đường dẫn",
      valueType: "text",
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
  ];

  return buildColumns(schema, columnMapping);
}
