// path: @/components/feature/permissions-column.js

import { buildColumns } from "@/utils/column-util";

export function getPermissionsColumn(params = {}, columnMapping = []) {
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
      key: "permission_key",
      dataIndex: "permission_key",
      title: "Mã quyền",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      key: "permission_desc",
      dataIndex: "permission_desc",
      title: "Mô tả quyền",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true }],
      },
    },
  ];

  return buildColumns(schema, columnMapping);
}
