// path: @/components/feature/classes-column.js

import { Space, Typography } from "antd";
import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function classesColumn(params = {}, columnMapping = []) {
  const { classStatus } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
      search: false,
      hideInTable: true,
      hideInDescriptions: true,
    },
    {
      key: "course_id",
      dataIndex: "course_id",
      title: "ID Khóa học",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
      search: false,
      hideInTable: true,
      hideInDescriptions: true,
    },
    {
      key: "module_id",
      dataIndex: "module_id",
      title: "ID Học phần",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
      search: false,
      hideInTable: true,
      hideInDescriptions: true,
    },
    {
      key: "class_fee",
      dataIndex: "class_fee",
      title: "Học phí lớp",
      valueType: "money",
      ...buildColumnProps({
        rules: [{ required: true }],
        locale: "vi-VN",
        precision: 0,
        style: { width: "100%" },
        colProps: { sm: 12 },
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
        colProps: { sm: 12 },
      }),
    },
    {
      key: "class_start_date",
      dataIndex: "class_start_date",
      title: "Ngày bắt đầu",
      valueType: "date",
      ...buildColumnProps({
        format: "YYYY-MM-DD",
        style: { width: "100%" },
        colProps: { sm: 12 },
      }),
    },
    {
      key: "class_end_date",
      dataIndex: "class_end_date",
      title: "Ngày kết thúc",
      valueType: "date",
      ...buildColumnProps({
        format: "YYYY-MM-DD",
        style: { width: "100%" },
        colProps: { sm: 12 },
      }),
    },
    {
      key: "class_status_id",
      dataIndex: "class_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildColumnProps({
        options: classStatus.options,
        valueEnum: classStatus.valueEnum,
        colProps: { xs: 12 },
        disabled: true,
      }),
    },
    {
      key: "syllabus_name",
      dataIndex: "syllabus_name",
      title: "Giáo trình",
      valueType: "text",
      ...buildColumnProps({ disabled: true, colProps: { xs: 12 } }),
    },
    {
      key: "module_name",
      dataIndex: "module_name",
      title: "Học phần",
      valueType: "text",
      ...buildColumnProps({ disabled: true, colProps: { xs: 12 } }),
    },
    {
      key: "course_name",
      dataIndex: "course_name",
      title: "Khóa học",
      valueType: "text",
      ...buildColumnProps({ disabled: true, colProps: { xs: 12 } }),
    },
    {
      key: "displayClass",
      title: "Lớp học",
      search: false,
      hideInForm: true,
      hideInDescriptions: true,
      render: (_, record) => {
        return (
          <Space direction="vertical" size={0}>
            <Space wrap>
              <Typography.Text strong>{record?.course_name}</Typography.Text>
              <Typography.Text>{record?.module_name}</Typography.Text>
            </Space>

            <Typography.Text type="secondary">
              {record?.syllabus_name}
            </Typography.Text>
          </Space>
        );
      },
    },
    {
      key: "displayModule",
      title: "Học phần",
      search: false,
      hideInForm: true,
      hideInDescriptions: true,
      render: (_, record) => {
        return (
          <Space wrap>
            <Typography.Text strong>{record?.syllabus_name}</Typography.Text>
            <Typography.Text type="secondary">
              {record?.module_name}
            </Typography.Text>
          </Space>
        );
      },
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const classesMapping = {
  default: [
    { key: "id" },
    { key: "course_id" },
    { key: "module_id" },
    { key: "displayClass" },
    { key: "syllabus_name", hideInTable: true },
    { key: "module_name", hideInTable: true },
    { key: "course_name", hideInTable: true },
    { key: "class_status_id" },
    { key: "class_start_date", search: false, responsive: ["lg"] },
    { key: "class_end_date", search: false, responsive: ["lg"] },
    { key: "class_fee", search: false, responsive: ["xl"] },
    { key: "class_total_fee", search: false, responsive: ["xl"] },
  ],
  courses: [
    { key: "id" },
    { key: "course_id" },
    { key: "module_id" },
    { key: "displayModule" },
    { key: "syllabus_name", hideInTable: true },
    { key: "module_name", hideInTable: true },
    { key: "course_name", search: false, hideInTable: true },
    { key: "class_status_id" },
    { key: "class_start_date", search: false, responsive: ["lg"] },
    { key: "class_end_date", search: false, responsive: ["lg"] },
    { key: "class_fee", search: false, responsive: ["xl"] },
    { key: "class_total_fee", search: false, responsive: ["xl"] },
  ],
};
