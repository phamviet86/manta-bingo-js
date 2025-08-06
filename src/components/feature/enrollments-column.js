// path: @/components/feature/enrollments-column.js

import { Space, Typography } from "antd";
import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function enrollmentsSchema(params = {}, columnMapping = []) {
  const { enrollmentStatus, enrollmentType, enrollmentPaymentType } = params;

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
      key: "user_id",
      dataIndex: "user_id",
      title: "Người dùng",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
      search: false,
      hideInTable: true,
      hideInDescriptions: true,
    },
    {
      key: "module_id",
      dataIndex: "module_id",
      title: "Module",
      valueType: "select",
      ...buildColumnProps({ disabled: true, hidden: true }),
      search: false,
      hideInTable: true,
      hideInDescriptions: true,
    },
    {
      key: "class_id",
      dataIndex: "class_id",
      title: "Lớp học",
      valueType: "select",
      ...buildColumnProps({ disabled: true, hidden: true }),
      search: false,
      hideInTable: true,
      hideInDescriptions: true,
    },
    {
      key: "enrollment_type_id",
      dataIndex: "enrollment_type_id",
      title: "Đăng ký",
      valueType: "select",
      ...buildColumnProps({
        rules: [{ required: true }],
        options: enrollmentType?.options,
        valueEnum: enrollmentType?.valueEnum,
        disabled: true,
        hidden: true,
      }),
    },
    {
      key: "enrollment_payment_type_id",
      dataIndex: "enrollment_payment_type_id",
      title: "Thanh toán",
      valueType: "select",
      ...buildColumnProps({
        options: enrollmentPaymentType?.options,
        valueEnum: enrollmentPaymentType?.valueEnum,
        colProps: { xs: 8 },
      }),
    },
    {
      key: "enrollment_payment_amount",
      dataIndex: "enrollment_payment_amount",
      title: "Số tiền",
      valueType: "money",
      ...buildColumnProps({
        locale: "vi-VN",
        precision: 0,
        style: { width: "100%" },
        colProps: { xs: 8 },
      }),
    },
    {
      key: "enrollment_payment_discount",
      dataIndex: "enrollment_payment_discount",
      title: "Giảm giá",
      valueType: "digit",
      ...buildColumnProps({
        style: { width: "100%" },
        formatter: (value) => (value ? `${value} %` : ""),
        colProps: { xs: 8 },
      }),
    },
    {
      key: "enrollment_start_date",
      dataIndex: "enrollment_start_date",
      title: "Ngày bắt đầu",
      valueType: "date",
      ...buildColumnProps({ format: "YYYY-MM-DD", style: { width: "100%" } }),
    },
    {
      key: "enrollment_end_date",
      dataIndex: "enrollment_end_date",
      title: "Ngày kết thúc",
      valueType: "date",
      ...buildColumnProps({ format: "YYYY-MM-DD", style: { width: "100%" } }),
    },
    {
      key: "enrollment_discount_notes",
      dataIndex: "enrollment_discount_notes",
      title: "Ghi chú giảm giá",
      valueType: "textarea",
      ...buildColumnProps({ autoSize: { minRows: 3, maxRows: 6 } }),
    },
    {
      key: "enrollment_desc",
      dataIndex: "enrollment_desc",
      title: "Mô tả",
      valueType: "textarea",
      ...buildColumnProps({ autoSize: { minRows: 3, maxRows: 6 } }),
    },
    {
      key: "enrollment_status_id",
      dataIndex: "enrollment_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildColumnProps({
        options: enrollmentStatus?.options,
        valueEnum: enrollmentStatus?.valueEnum,
        disabled: true,
        colProps: { xs: 12 },
      }),
    },
    {
      key: "user_name",
      dataIndex: "user_name",
      title: "Người dùng",
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
      key: "module_name",
      dataIndex: "module_name",
      title: "Học phần",
      valueType: "text",
      ...buildColumnProps({ disabled: true, colProps: { xs: 12 } }),
    },
    {
      key: "syllabus_name",
      dataIndex: "syllabus_name",
      title: "Giáo trình",
      valueType: "text",
      ...buildColumnProps({ disabled: true, colProps: { xs: 12 } }),
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
      hideInForm: true,
      hideInDescriptions: true,
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const enrollmentsMapping = {
  classPage: [
    { key: "id" },
    { key: "user_id" },
    { key: "module_id" },
    { key: "class_id" },
    { key: "enrollment_type_id" },
    { key: "user_name" },
    { key: "enrollment_status_id", responsive: ["md"] },
    { key: "enrollment_payment_type_id", responsive: ["xl"] },
    { key: "enrollment_payment_amount", search: false, responsive: ["xl"] },
    { key: "enrollment_payment_discount", search: false, responsive: ["xl"] },
    { key: "enrollment_discount_notes", search: false, hideInTable: true },
    { key: "enrollment_start_date", search: false, responsive: ["lg"] },
    { key: "enrollment_end_date", search: false, responsive: ["lg"] },
    {
      key: "enrollment_desc",
      search: false,
      hideInTable: true,
      responsive: ["md"],
    },
  ],
};
