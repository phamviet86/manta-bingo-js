// path: @/components/feature/permissions-column.js

import { buildColumns, fieldProps, formItemProps } from "@/utils/column-util";

export function getPermissionsColumn(params = {}, columnMapping = []) {
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
      key: "permission_key",
      dataIndex: "permission_key",
      title: "Mã quyền",
      valueType: "text",
      fieldProps: fieldProps({
        placeholder: "url.path.method",
      }),
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "permission_desc",
      dataIndex: "permission_desc",
      title: "Mô tả",
      valueType: "text",
      formItemProps: formItemProps({
        required: true,
      }),
    },
  ];

  return buildColumns(schema, columnMapping);
}
