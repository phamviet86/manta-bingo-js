// path: @/components/feature/schedules-column.js

import { buildSchema, buildSchemaProps } from "@/utils/schema-util";

export function schedulesSchema(params = {}, columnMapping = []) {
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
      key: "class_id",
      dataIndex: "class_id",
      title: "Lớp học",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "shift_id",
      dataIndex: "shift_id",
      title: "Ca học",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "schedule_date",
      dataIndex: "schedule_date",
      title: "Ngày học",
      valueType: "date",
      ...buildSchemaProps({
        rules: [{ required: true }],
        format: "YYYY-MM-DD",
        style: { width: "100%" },
      }),
    },
    {
      key: "schedule_status_id",
      dataIndex: "schedule_status_id",
      title: "Trạng thái lịch học",
      valueType: "select",
      ...buildSchemaProps({
        rules: [{ required: true }],
        options: optionStatus?.options,
        valueEnum: optionStatus?.valueEnum,
      }),
    },
    {
      key: "source_id",
      dataIndex: "source_id",
      title: "Nguồn lịch học",
      valueType: "text",
      ...buildSchemaProps({}),
    },
    {
      key: "lecture_id",
      dataIndex: "lecture_id",
      title: "Giảng viên",
      valueType: "text",
      ...buildSchemaProps({}),
    },
    {
      key: "room_id",
      dataIndex: "room_id",
      title: "Phòng học",
      valueType: "text",
      ...buildSchemaProps({}),
    },
    {
      key: "schedule_desc",
      dataIndex: "schedule_desc",
      title: "Ghi chú lịch học",
      valueType: "textarea",
      ...buildSchemaProps({ autoSize: { minRows: 3, maxRows: 6 } }),
    },
  ];

  return buildSchema(schema, columnMapping);
}

export const schedulesMapping = {
  fields: [
    { key: "id" },
    { key: "class_id" },
    { key: "shift_id" },
    { key: "schedule_date" },
    { key: "schedule_status_id" },
    { key: "source_id" },
    { key: "lecture_id" },
    { key: "room_id" },
    { key: "schedule_desc" },
  ],
  columns: [
    { key: "id" },
    { key: "class_id" },
    { key: "shift_id" },
    { key: "schedule_date" },
    { key: "schedule_status_id" },
    { key: "source_id" },
    { key: "lecture_id" },
    { key: "room_id" },
    { key: "schedule_desc" },
  ],
};
