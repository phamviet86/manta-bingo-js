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
      ...buildColumnProps({ disabled: true, hidden: true }),
      hideInTable: true,
      hideInDescriptions: true,
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
  default: [],
};
