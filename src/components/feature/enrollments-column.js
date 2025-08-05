// path: @/components/feature/enrollments-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function enrollmentsColumn(params = {}, columnMapping = []) {
  const { optionStatus } = params;

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
      key: "user_id",
      dataIndex: "user_id",
      title: "Người dùng",
      valueType: "text",
      ...buildColumnProps({ rules: [{ required: true }] }),
    },
    {
      key: "enrollment_type_id",
      dataIndex: "enrollment_type_id",
      title: "Loại đăng ký",
      valueType: "text",
      ...buildColumnProps({ rules: [{ required: true }] }),
    },
    {
      key: "module_id",
      dataIndex: "module_id",
      title: "Module",
      valueType: "select",
      ...buildColumnProps({
        options: optionStatus?.options,
        valueEnum: optionStatus?.valueEnum,
      }),
    },
    {
      key: "class_id",
      dataIndex: "class_id",
      title: "Lớp học",
      valueType: "select",
      ...buildColumnProps({
        options: optionStatus?.options,
        valueEnum: optionStatus?.valueEnum,
      }),
    },
    {
      key: "enrollment_payment_type_id",
      dataIndex: "enrollment_payment_type_id",
      title: "Hình thức thanh toán",
      valueType: "select",
      ...buildColumnProps({
        options: optionStatus?.options,
        valueEnum: optionStatus?.valueEnum,
      }),
    },
    {
      key: "enrollment_payment_amount",
      dataIndex: "enrollment_payment_amount",
      title: "Số tiền thanh toán",
      valueType: "money",
      ...buildColumnProps({
        locale: "vi-VN",
        precision: 0,
        style: { width: "100%" },
      }),
    },
    {
      key: "enrollment_payment_discount",
      dataIndex: "enrollment_payment_discount",
      title: "Giảm giá",
      valueType: "money",
      ...buildColumnProps({
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
      title: "Mô tả đăng ký",
      valueType: "textarea",
      ...buildColumnProps({ autoSize: { minRows: 3, maxRows: 6 } }),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const enrollmentsMapping = {
  default: [
    { key: "id" },
    { key: "user_id" },
    { key: "enrollment_type_id" },
    { key: "module_id" },
    { key: "class_id" },
    { key: "enrollment_payment_type_id" },
    { key: "enrollment_payment_amount" },
    { key: "enrollment_payment_discount" },
    { key: "enrollment_start_date" },
    { key: "enrollment_end_date" },
    { key: "enrollment_discount_notes" },
    { key: "enrollment_desc" },
  ],
};
