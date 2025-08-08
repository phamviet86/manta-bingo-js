// path: @/components/feature/shifts-schema.js

import { buildSchema, buildSchemaProps } from "@/utils/schema-util";

export function shiftsSchema(params = {}, columnMapping = []) {
  const { shiftStatus } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "shift_name",
      dataIndex: "shift_name",
      title: "Ca học",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "shift_status_id",
      dataIndex: "shift_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildSchemaProps({
        rules: [{ required: true }],
        options: shiftStatus.options,
        valueEnum: shiftStatus.valueEnum,
      }),
    },
    {
      key: "shift_start_time",
      dataIndex: "shift_start_time",
      title: "Giờ bắt đầu",
      valueType: "time",
      ...buildSchemaProps({
        rules: [{ required: true }],
        format: "HH:mm",
        style: { width: "100%" },
      }),
    },
    {
      key: "shift_end_time",
      dataIndex: "shift_end_time",
      title: "Giờ kết thúc",
      valueType: "time",
      ...buildSchemaProps({
        rules: [{ required: true }],
        format: "HH:mm",
        style: { width: "100%" },
      }),
    },
    {
      key: "shift_desc",
      dataIndex: "shift_desc",
      title: "Mô tả",
      valueType: "textarea",
      ...buildSchemaProps({ autoSize: { minRows: 3, maxRows: 9 } }),
    },
  ];

  return buildSchema(schema, columnMapping);
}

export const shiftsMapping = {
  fields: [
    { key: "id" },
    { key: "shift_name" },
    { key: "shift_status_id" },
    { key: "shift_start_time", colProps: { xs: 12 } },
    { key: "shift_end_time", colProps: { xs: 12 } },
    { key: "shift_desc" },
  ],
  columns: [
    { key: "shift_name" },
    { key: "shift_status_id" },
    { key: "shift_start_time", search: false, responsive: ["md"] },
    { key: "shift_end_time", search: false, responsive: ["md"] },
    { key: "shift_desc", search: false, responsive: ["lg"] },
  ],
};
