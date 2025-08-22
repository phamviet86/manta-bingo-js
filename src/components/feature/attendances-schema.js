// path: @/components/feature/attendances-schema.js

import { Card } from "antd";
import { DiceBeerAvatar, DiceBeerImage } from "@/components/ui";
import { buildSchema, buildSchemaProps } from "@/utils/schema-util";

export function attendancesSchema(params = {}, columnMapping = []) {
  const { attendanceStatus, attendanceType } = params;

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
      title: "ID Lịch học",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "enrollment_id",
      dataIndex: "enrollment_id",
      title: "ID Đăng ký",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "attendance_status_id",
      dataIndex: "attendance_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildSchemaProps({
        options: attendanceStatus?.options,
        valueEnum: attendanceStatus?.valueEnum,
        rules: [{ required: true }],
      }),
    },
    {
      key: "attendance_type_id",
      dataIndex: "attendance_type_id",
      title: "Phân loại",
      valueType: "select",
      ...buildSchemaProps({
        options: attendanceType?.options,
        valueEnum: attendanceType?.valueEnum,
      }),
    },
    {
      key: "attendance_desc",
      dataIndex: "attendance_desc",
      title: "Ghi chú điểm danh",
      valueType: "textarea",
      ...buildSchemaProps({ autoSize: { minRows: 3, maxRows: 6 } }),
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
  ],
  columns: [
    { key: "attendance_status_id" },
    { key: "attendance_type_id" },
    { key: "attendance_desc", search: false },
  ],
  metas: {
    title: { render: () => "title" },
    subTitle: { render: () => "subTitle" },
    // description: { render: () => "description" },
    extra: {
      render: (record) => (
        <DiceBeerImage
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          seed={record?.id}
        />
      ),
    },
    content: { render: () => "content" },
    // extra: { render: () => "extra" },
    // actions: { render: () => "actions" },
  },
};
