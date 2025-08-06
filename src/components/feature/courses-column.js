// path: @/components/feature/courses-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function coursesSchema(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
    },
    {
      key: "course_name",
      dataIndex: "course_name",
      title: "Khóa học",
      valueType: "text",
      ...buildColumnProps({ rules: [{ required: true }] }),
    },
    {
      key: "course_code",
      dataIndex: "course_code",
      title: "Mã khóa học",
      valueType: "text",
      ...buildColumnProps({ rules: [{ required: true }] }),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const coursesMapping = {
  fields: [{ key: "id" }, { key: "course_name" }, { key: "course_code" }],
  columns: [{ key: "course_name" }, { key: "course_code" }],
};
