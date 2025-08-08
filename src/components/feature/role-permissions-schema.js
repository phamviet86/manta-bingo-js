// path: @/components/feature/role-permissions-schema.js

import { buildSchema, buildSchemaProps } from "@/utils/schema-util";

export function rolePermissionsSchema(params = {}, columnMapping = []) {
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
      key: "role_id",
      dataIndex: "role_id",
      title: "Vai trò",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "permission_id",
      dataIndex: "permission_id",
      title: "Quyền hạn",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
  ];

  return buildSchema(schema, columnMapping);
}

export const rolePermissionsMapping = {
  fields: [],
  columns: [],
};
