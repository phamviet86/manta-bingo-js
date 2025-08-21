// path: @/components/feature/attendances-schema.js

import { buildSchema, buildSchemaProps } from "@/utils/schema-util";

export function attendancesSchema(params = {}, columnMapping = []) {
  const { optionStatus } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "schedule_id",
      dataIndex: "schedule_id",
      title: "Lịch học",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "enrollment_id",
      dataIndex: "enrollment_id",
      title: "Đăng ký học",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "attendance_status_id",
      dataIndex: "attendance_status_id",
      title: "Trạng thái điểm danh",
      valueType: "select",
      ...buildSchemaProps({
        options: optionStatus?.options,
        valueEnum: optionStatus?.valueEnum,
        rules: [{ required: true }],
      }),
    },
    {
      key: "attendance_type_id",
      dataIndex: "attendance_type_id",
      title: "Loại điểm danh",
      valueType: "select",
      ...buildSchemaProps({
        options: optionStatus?.options,
        valueEnum: optionStatus?.valueEnum,
        rules: [{ required: true }],
      }),
    },
    {
      key: "attendance_desc",
      dataIndex: "attendance_desc",
      title: "Ghi chú điểm danh",
      valueType: "textarea",
      ...buildSchemaProps({ autoSize: { minRows: 3, maxRows: 6 } }),
    },
    {
      key: "attendance_time",
      dataIndex: "attendance_time",
      title: "Thời gian điểm danh",
      valueType: "time",
      ...buildSchemaProps({ format: "HH:mm", style: { width: "100%" } }),
    },
    {
      key: "attendance_date",
      dataIndex: "attendance_date",
      title: "Ngày điểm danh",
      valueType: "date",
      ...buildSchemaProps({ format: "YYYY-MM-DD", style: { width: "100%" } }),
    },
    {
      key: "attendance_fee",
      dataIndex: "attendance_fee",
      title: "Phí điểm danh",
      valueType: "money",
      ...buildSchemaProps({
        locale: "vi-VN",
        precision: 0,
        style: { width: "100%" },
      }),
    },
  ];

  return buildSchema(schema, columnMapping);
}

export const attendancesMapping = {
  fields: [
    { key: "id" },
    { key: "schedule_id" },
    { key: "enrollment_id" },
    { key: "attendance_status_id" },
    { key: "attendance_type_id" },
    { key: "attendance_desc" },
    { key: "attendance_time" },
    { key: "attendance_date" },
    { key: "attendance_fee" },
  ],
  columns: [
    { key: "id" },
    { key: "schedule_id" },
    { key: "enrollment_id" },
    { key: "attendance_status_id" },
    { key: "attendance_type_id" },
    { key: "attendance_desc" },
    { key: "attendance_time" },
    { key: "attendance_date" },
    { key: "attendance_fee" },
  ],
};
