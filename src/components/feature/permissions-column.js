// path: @/components/feature/permissions-column.js

import {
  buildColumns,
  buildFieldProps,
  buildFormItemProps,
} from "@/utils/column-util";

export function getPermissionsColumn(params = {}, columnMapping = []) {
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
      key: "permission_key",
      dataIndex: "permission_key",
      title: "Mã quyền",
      valueType: "text",
      fieldProps: buildFieldProps({
        placeholder: "url.path.method",
      }),
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
    {
      key: "permission_desc",
      dataIndex: "permission_desc",
      title: "Mô tả",
      valueType: "text",
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
  ];

  return buildColumns(schema, columnMapping);
}
