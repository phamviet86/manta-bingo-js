// path: @/components/feature/classes-schema.js

import { Space, Typography } from "antd";
import { buildSchema, buildSchemaProps } from "@/utils/schema-util";

export function classesSchema(params = {}, columnMapping = []) {
  const { classStatus } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "course_id",
      dataIndex: "course_id",
      title: "ID Khóa học",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "module_id",
      dataIndex: "module_id",
      title: "ID Học phần",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "class_fee",
      dataIndex: "class_fee",
      title: "Học phí lớp",
      valueType: "money",
      ...buildSchemaProps({
        rules: [{ required: true }],
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
      ...buildSchemaProps({
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
      ...buildSchemaProps({ format: "YYYY-MM-DD", style: { width: "100%" } }),
    },
    {
      key: "class_end_date",
      dataIndex: "class_end_date",
      title: "Ngày kết thúc",
      valueType: "date",
      ...buildSchemaProps({ format: "YYYY-MM-DD", style: { width: "100%" } }),
    },
    {
      key: "class_status_id",
      dataIndex: "class_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildSchemaProps({
        options: classStatus.options,
        valueEnum: classStatus.valueEnum,
        disabled: true,
      }),
    },
    {
      key: "syllabus_name",
      dataIndex: "syllabus_name",
      title: "Giáo trình",
      valueType: "text",
      ...buildSchemaProps({ disabled: true }),
    },
    {
      key: "module_name",
      dataIndex: "module_name",
      title: "Học phần",
      valueType: "text",
      ...buildSchemaProps({ disabled: true }),
    },
    {
      key: "course_name",
      dataIndex: "course_name",
      title: "Khóa học",
      valueType: "text",
      ...buildSchemaProps({ disabled: true }),
    },
    {
      key: "displayClass",
      title: "Lớp học",
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
      search: false,
      hideInDescriptions: true,
    },
    {
      key: "displayModule",
      title: "Học phần",
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
      search: false,
      hideInDescriptions: true,
    },
  ];

  return buildSchema(schema, columnMapping);
}

export const classesMapping = {
  fields: [
    { key: "id" },
    { key: "course_id" },
    { key: "module_id" },
    { key: "syllabus_name", colProps: { xs: 12 } },
    { key: "module_name", colProps: { xs: 12 } },
    { key: "course_name", colProps: { xs: 12 } },
    { key: "class_status_id", colProps: { xs: 12 } },
    { key: "class_start_date", colProps: { xs: 12 } },
    { key: "class_end_date", colProps: { xs: 12 } },
    { key: "class_fee", colProps: { xs: 12 } },
    { key: "class_total_fee", colProps: { xs: 12 } },
  ],
  columns: [
    { key: "displayClass" },
    { key: "course_name", hideInTable: true },
    { key: "syllabus_name", hideInTable: true },
    { key: "module_name", hideInTable: true },
    { key: "class_status_id" },
    { key: "class_start_date", search: false, responsive: ["lg"] },
    { key: "class_end_date", search: false, responsive: ["lg"] },
    { key: "class_fee", search: false, responsive: ["xl"] },
    { key: "class_total_fee", search: false, responsive: ["xl"] },
  ],
  courseClassesColumns: [
    { key: "displayModule" },
    { key: "syllabus_name", hideInTable: true },
    { key: "module_name", hideInTable: true },
    { key: "class_status_id" },
    { key: "class_start_date", search: false, responsive: ["lg"] },
    { key: "class_end_date", search: false, responsive: ["lg"] },
    { key: "class_fee", search: false, responsive: ["xl"] },
    { key: "class_total_fee", search: false, responsive: ["xl"] },
  ],
};
