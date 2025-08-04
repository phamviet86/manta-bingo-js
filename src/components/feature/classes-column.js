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
    {
      key: "syllabus_name",
      dataIndex: "syllabus_name",
      title: "Giáo trình",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
    },
    {
      key: "module_name",
      dataIndex: "module_name",
      title: "Học phần",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
    },
    {
      key: "course_name",
      dataIndex: "course_name",
      title: "Khóa học",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const classesMapping = {
  default: [
    { key: "id" },
    { key: "syllabus_name" },
    { key: "module_name" },
    { key: "class_status_id" },
    { key: "course_id" },
    { key: "module_id" },
    { key: "class_start_date", search: false },
    { key: "class_end_date", search: false },
    { key: "class_fee", search: false },
    { key: "class_total_fee", search: false },
  ],
};
