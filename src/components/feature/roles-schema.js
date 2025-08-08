// path: @/components/feature/roles-schema.js

import { buildSchema, buildSchemaProps } from "@/utils/schema-util";

export function rolesSchema(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "role_name",
      dataIndex: "role_name",
      title: "Vai trò",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "role_path",
      dataIndex: "role_path",
      title: "Đường dẫn",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
  ];

  return buildSchema(schema, columnMapping);
}

export const rolesMapping = {
  fields: [{ key: "id" }, { key: "role_name" }, { key: "role_path" }],
  columns: [
    { key: "id", width: 56, search: false },
    { key: "role_name" },
    { key: "role_path" },
  ],
};
