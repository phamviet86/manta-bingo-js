// path: @/components/feature/permissions-schema.js

import { buildSchema, buildSchemaProps } from "@/utils/schema-util";

export function permissionsSchema(params = {}, columnMapping = []) {
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
      key: "permission_key",
      dataIndex: "permission_key",
      title: "Mã quyền",
      valueType: "text",
      ...buildSchemaProps({
        rules: [{ required: true }],
        placeholder: "url.path.method",
      }),
    },
    {
      key: "permission_desc",
      dataIndex: "permission_desc",
      title: "Mô tả",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
  ];

  return buildSchema(schema, columnMapping);
}

export const permissionsMapping = {
  fields: [
    { key: "id" },
    { key: "permission_key" },
    { key: "permission_desc" },
  ],
  columns: [
    { key: "id", width: 56, search: false, responsive: ["md"] },
    { key: "permission_key" },
    { key: "permission_desc" },
  ],
};
