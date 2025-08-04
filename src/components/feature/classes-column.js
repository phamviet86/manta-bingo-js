// path: @/components/feature/classes-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function classesColumn(params = {}, columnMapping = []) {
  const { classStatus } = params;

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
      key: "course_id",
      dataIndex: "course_id",
      title: "Khóa học",
      valueType: "text",
      hideInTable: true,
      hideInDescriptions: true,
      ...buildColumnProps({ disabled: true, hidden: true }),
    },
    {
      key: "module_id",
      dataIndex: "module_id",
      title: "Học phần",
      valueType: "text",
      hideInTable: true,
      hideInDescriptions: true,
      ...buildColumnProps({ disabled: true, hidden: true }),
    },
    {
      key: "class_fee",
      dataIndex: "class_fee",
      title: "Học phí lớp",
      valueType: "money",
      ...buildColumnProps({
        required: true,
        locale: "vi-VN",
        precision: 0,
        style: { width: "100%" },
      }),
    },
    {
      key: "class_total_fee",
      dataIndex: "class_total_fee",
      title: "Tổng học phí",
      valueType: "money",
      ...buildColumnProps({
        locale: "vi-VN",
        precision: 0,
        style: { width: "100%" },
      }),
    },
    {
      key: "class_start_date",
      dataIndex: "class_start_date",
      title: "Ngày bắt đầu",
      valueType: "date",
      ...buildColumnProps({ format: "YYYY-MM-DD", style: { width: "100%" } }),
    },
    {
      key: "class_end_date",
      dataIndex: "class_end_date",
      title: "Ngày kết thúc",
      valueType: "date",
      ...buildColumnProps({ format: "YYYY-MM-DD", style: { width: "100%" } }),
    },
    {
      key: "class_status_id",
      dataIndex: "class_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildColumnProps({
        options: classStatus.options,
        valueEnum: classStatus.valueEnum,
      }),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const classesMapping = {
  default: [
    { key: "id" },
    { key: "course_id" },
    { key: "module_id" },
    { key: "class_fee" },
    { key: "class_total_fee" },
    { key: "class_start_date" },
    { key: "class_end_date" },
  ],
};
