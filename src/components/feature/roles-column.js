// path: @/components/feature/roles-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function rolesColumn(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildColumnProps({
        disabled: true,
        hidden: true,
        width: 56,
      }),
      search: false,
    },
    {
      key: "role_name",
      dataIndex: "role_name",
      title: "Vai trò",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "role_path",
      dataIndex: "role_path",
      title: "Đường dẫn",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const rolesMapping = {
  default: [],
};
