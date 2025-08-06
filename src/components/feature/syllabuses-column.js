// path: @/components/feature/syllabuses-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function syllabusesSchema(params = {}, columnMapping = []) {
  const { syllabusStatus } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
    },
    {
      key: "syllabus_name",
      dataIndex: "syllabus_name",
      title: "Giáo trình",
      valueType: "text",
      ...buildColumnProps({ rules: [{ required: true }] }),
    },
    {
      key: "syllabus_status_id",
      dataIndex: "syllabus_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildColumnProps({
        rules: [{ required: true }],
        valueEnum: syllabusStatus?.valueEnum,
        options: syllabusStatus.options,
      }),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const syllabusesMapping = {
  fields: [
    { key: "id" },
    { key: "syllabus_name" },
    { key: "syllabus_status_id" },
  ],
  columns: [{ key: "syllabus_name" }, { key: "syllabus_status_id" }],
};
