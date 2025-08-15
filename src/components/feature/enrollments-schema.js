// path: @/components/feature/enrollments-schema.js

import { Space, Typography } from "antd";
import { DiceBeerAvatar } from "@/components/ui";
import { buildSchema, buildSchemaProps } from "@/utils/schema-util";
import { renderEnum } from "@/utils/render-util";

export function enrollmentsSchema(params = {}, columnMapping = []) {
  const { enrollmentStatus, enrollmentType, enrollmentPaymentType } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "user_id",
      dataIndex: "user_id",
      title: "Người dùng",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "module_id",
      dataIndex: "module_id",
      title: "Module",
      valueType: "select",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "class_id",
      dataIndex: "class_id",
      title: "Lớp học",
      valueType: "select",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "enrollment_type_id",
      dataIndex: "enrollment_type_id",
      title: "Đăng ký",
      valueType: "select",
      ...buildSchemaProps({
        rules: [{ required: true }],
        options: enrollmentType?.options,
        valueEnum: enrollmentType?.valueEnum,
        disabled: true,
      }),
    },
    {
      key: "enrollment_payment_type_id",
      dataIndex: "enrollment_payment_type_id",
      title: "Thanh toán",
      valueType: "select",
      ...buildSchemaProps({
        options: enrollmentPaymentType?.options,
        valueEnum: enrollmentPaymentType?.valueEnum,
      }),
    },
    {
      key: "enrollment_payment_amount",
      dataIndex: "enrollment_payment_amount",
      title: "Số tiền",
      valueType: "money",
      ...buildSchemaProps({
        locale: "vi-VN",
        precision: 0,
        style: { width: "100%" },
      }),
    },
    {
      key: "enrollment_start_date",
      dataIndex: "enrollment_start_date",
      title: "Ngày bắt đầu",
      valueType: "date",
      ...buildSchemaProps({ format: "YYYY-MM-DD", style: { width: "100%" } }),
    },
    {
      key: "enrollment_end_date",
      dataIndex: "enrollment_end_date",
      title: "Ngày kết thúc",
      valueType: "date",
      ...buildSchemaProps({ format: "YYYY-MM-DD", style: { width: "100%" } }),
    },
    {
      key: "enrollment_desc",
      dataIndex: "enrollment_desc",
      title: "Mô tả",
      valueType: "textarea",
      ...buildSchemaProps({ autoSize: { minRows: 3, maxRows: 6 } }),
    },
    {
      key: "enrollment_status_id",
      dataIndex: "enrollment_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildSchemaProps({
        options: enrollmentStatus?.options,
        valueEnum: enrollmentStatus?.valueEnum,
        disabled: true,
      }),
    },
    {
      key: "user_name",
      dataIndex: "user_name",
      title: "Người dùng",
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
      key: "module_name",
      dataIndex: "module_name",
      title: "Học phần",
      valueType: "text",
      ...buildSchemaProps({ disabled: true }),
    },
    {
      key: "syllabus_name",
      dataIndex: "syllabus_name",
      title: "Giáo trình",
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
              <Typography.Text type="secondary">
                {record?.module_name}
              </Typography.Text>
            </Space>

            {renderEnum(
              enrollmentType?.valueEnum,
              record?.enrollment_type_id,
              "",
              "tag"
            )}
          </Space>
        );
      },
      search: false,
      hideInDescriptions: true,
    },
    {
      key: "displayAvatar",
      width: 68,
      align: "center",
      render: (_, record) => (
        <DiceBeerAvatar
          src={record?.user_avatar}
          seed={record?.user_id}
          shape="square"
          size="large"
          alt="Ảnh đại diện"
        />
      ),
      search: false,
      hideInDescriptions: true,
    },
    {
      key: "displayUser",
      title: "Người dùng",
      render: (_, record) => {
        return (
          <Space direction="vertical" size={0}>
            <Typography.Text strong>{record?.user_name}</Typography.Text>
            {renderEnum(
              enrollmentType?.valueEnum,
              record?.enrollment_type_id,
              "",
              "tag"
            )}
          </Space>
        );
      },
      search: false,
      hideInDescriptions: true,
    },
  ];

  return buildSchema(schema, columnMapping);
}

export const enrollmentsMapping = {
  fields: [
    { key: "syllabus_name", colProps: { xs: 12 } }, // disabled
    { key: "module_name", colProps: { xs: 12 } }, // disabled
    { key: "course_name", colProps: { xs: 12 } }, // disabled
    { key: "enrollment_status_id", colProps: { xs: 12 } }, // disabled
    { key: "user_name", colProps: { xs: 12 } }, // disabled
    { key: "enrollment_type_id", colProps: { xs: 12 } }, // disabled
    { key: "enrollment_payment_type_id", colProps: { xs: 12 } },
    { key: "enrollment_payment_amount", colProps: { xs: 12 } },
    { key: "enrollment_start_date", colProps: { xs: 12 } },
    { key: "enrollment_end_date", colProps: { xs: 12 } },
    { key: "enrollment_desc" },
    { key: "id" }, // hidden
    { key: "user_id" }, // hidden
    { key: "module_id" }, // hidden
    { key: "class_id" }, // hidden
  ],
  classEnrollmentsColumns: [
    { key: "displayUser" },
    { key: "user_name", hideInTable: true },
    { key: "enrollment_type_id", hideInTable: true },
    { key: "enrollment_status_id", responsive: ["md"] },
    { key: "enrollment_start_date", search: false, responsive: ["lg"] },
    { key: "enrollment_end_date", search: false, responsive: ["lg"] },
    { key: "enrollment_payment_type_id", responsive: ["xl"] },
    { key: "enrollment_payment_amount", search: false, responsive: ["xl"] },
    { key: "enrollment_desc", search: false, responsive: ["lg"] },
  ],
  userEnrollmentsColumns: [
    { key: "displayClass" },
    { key: "user_name", hideInTable: true },
    { key: "enrollment_type_id", hideInTable: true },
    { key: "enrollment_status_id", responsive: ["md"] },
    { key: "enrollment_start_date", search: false, responsive: ["lg"] },
    { key: "enrollment_end_date", search: false, responsive: ["lg"] },
    { key: "enrollment_payment_type_id", responsive: ["xl"] },
    { key: "enrollment_payment_amount", search: false, responsive: ["xl"] },
    { key: "enrollment_desc", search: false, responsive: ["lg"] },
  ],
  classEnrollmentsColumns: [
    { key: "displayUser" },
    { key: "user_name", hideInTable: true },
    { key: "enrollment_type_id", hideInTable: true },
    { key: "enrollment_status_id", responsive: ["md"] },
    { key: "enrollment_start_date", search: false, responsive: ["lg"] },
    { key: "enrollment_end_date", search: false, responsive: ["lg"] },
    { key: "enrollment_payment_type_id", hideInTable: true },
    { key: "enrollment_payment_amount", search: false, hideInTable: true },
    { key: "enrollment_desc", search: false, responsive: ["xl"] },
  ],
};
