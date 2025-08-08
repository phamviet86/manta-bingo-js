// path: @/components/feature/syllabuses-schema.js

import { buildSchema, buildSchemaProps } from "@/utils/schema-util";

export function syllabusesSchema(params = {}, columnMapping = []) {
  const { syllabusStatus } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "syllabus_name",
      dataIndex: "syllabus_name",
      title: "Giáo trình",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "syllabus_status_id",
      dataIndex: "syllabus_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildSchemaProps({
        rules: [{ required: true }],
        valueEnum: syllabusStatus?.valueEnum,
        options: syllabusStatus.options,
      }),
    },
  ];

  return buildSchema(schema, columnMapping);
}

export const syllabusesMapping = {
  fields: [
    { key: "id" },
    { key: "syllabus_name" },
    { key: "syllabus_status_id" },
  ],
  columns: [{ key: "syllabus_name" }, { key: "syllabus_status_id" }],
};
