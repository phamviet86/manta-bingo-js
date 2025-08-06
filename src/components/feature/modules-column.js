// path: @/components/feature/modules-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function modulesSchema(params = {}, columnMapping = []) {
  const { moduleStatus } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
    },
    {
      key: "syllabus_id",
      dataIndex: "syllabus_id",
      title: "ID Giáo trình",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
    },
    {
      key: "module_name",
      dataIndex: "module_name",
      title: "Học phần",
      valueType: "text",
      ...buildColumnProps({ rules: [{ required: true }] }),
    },
    {
      key: "module_status_id",
      dataIndex: "module_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildColumnProps({
        rules: [{ required: true }],
        valueEnum: moduleStatus?.valueEnum,
        options: moduleStatus.options,
      }),
    },
    {
      key: "module_desc",
      dataIndex: "module_desc",
      title: "Mô tả",
      valueType: "textarea",
      ...buildColumnProps({ autoSize: { minRows: 3, maxRows: 6 } }),
      search: false,
      responsive: ["md"],
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const modulesMapping = {
  fields: [
    { key: "id" },
    { key: "syllabus_id" },
    { key: "module_name" },
    { key: "module_status_id" },
    { key: "module_desc" },
  ],
  columns: [{ key: "module_name" }, { key: "module_status_id" }],
};
