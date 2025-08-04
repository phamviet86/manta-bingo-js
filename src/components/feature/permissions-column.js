// path: @/components/feature/permissions-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function permissionsColumn(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
      width: 56,
      search: false,
    },
    {
      key: "permission_key",
      dataIndex: "permission_key",
      title: "Mã quyền",
      valueType: "text",
      ...buildColumnProps({ placeholder: "url.path.method", required: true }),
    },
    {
      key: "permission_desc",
      dataIndex: "permission_desc",
      title: "Mô tả",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const permissionsMapping = {
  default: [],
};
