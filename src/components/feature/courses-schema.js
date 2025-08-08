// path: @/components/feature/courses-schema.js

import { buildSchema, buildSchemaProps } from "@/utils/schema-util";

export function coursesSchema(params = {}, columnMapping = []) {
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
      key: "course_name",
      dataIndex: "course_name",
      title: "Khóa học",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "course_code",
      dataIndex: "course_code",
      title: "Mã khóa học",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
  ];

  return buildSchema(schema, columnMapping);
}

export const coursesMapping = {
  fields: [{ key: "id" }, { key: "course_name" }, { key: "course_code" }],
  columns: [{ key: "course_name" }, { key: "course_code" }],
};
