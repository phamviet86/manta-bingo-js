// path: @/components/feature/courses-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function coursesColumn(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      hideInTable: true,
      hideInDescriptions: true,
      ...buildColumnProps({ disabled: true, hidden: true }),
    },
    {
      key: "course_name",
      dataIndex: "course_name",
      title: "Khóa học",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "course_code",
      dataIndex: "course_code",
      title: "Mã khóa học",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    // Optional fields (not present in courses table, so left empty)
  ];

  return buildColumns(schema, columnMapping);
}

export const coursesMapping = {
  default: [{ key: "id" }, { key: "course_name" }, { key: "course_code" }],
};
