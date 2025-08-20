// path: @/components/feature/schedules-schema.js

import { Space, Typography } from "antd";
import { presetPrimaryColors } from "@ant-design/colors";
import { buildSchema, buildSchemaProps } from "@/utils/schema-util";
import { fetchOption } from "@/utils/fetch-util";
import { formatTimeHHMM } from "@/utils/format-util";
import { renderEnum } from "@/utils/render-util";

// render function
function renderDisplayClass(_, record, scheduleStatus) {
  return (
    <Space direction="vertical" size={0}>
      <Space wrap>
        <Typography.Text strong>{record?.course_name}</Typography.Text>
        <Typography.Text>{record?.module_name}</Typography.Text>
        {renderEnum(
          scheduleStatus.valueEnum,
          record?.schedule_status_id,
          null,
          "tag"
        )}
      </Space>
      <Typography.Text type="secondary">{record?.lecture_name}</Typography.Text>
    </Space>
  );
}

function renderDisplayTime(_, record) {
  return (
    <Space direction="vertical" size={0}>
      <Typography.Text strong>{record?.shift_name}</Typography.Text>
      <Space wrap split="-">
        <Typography.Text type="secondary">
          {formatTimeHHMM(record?.shift_start_time)}
        </Typography.Text>
        <Typography.Text type="secondary">
          {formatTimeHHMM(record?.shift_end_time)}
        </Typography.Text>
      </Space>
    </Space>
  );
}

export function schedulesSchema(params = {}, columnMapping = []) {
  const { scheduleStatus } = params;

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
      title: "ID Lớp học",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "shift_id",
      dataIndex: "shift_id",
      title: "Ca học",
      valueType: "select",
      request: async (params) =>
        fetchOption("/api/shifts", params, {
          value: "id",
          label: "shift_name",
        }),
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
      title: "Trạng thái",
      valueType: "select",
      ...buildSchemaProps({
        rules: [{ required: true }],
        options: scheduleStatus?.options,
        valueEnum: scheduleStatus?.valueEnum,
      }),
    },
    {
      key: "source_id",
      dataIndex: "source_id",
      title: "Nguồn lịch học",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "lecture_id",
      dataIndex: "lecture_id",
      title: "Bài giảng",
      valueType: "text",
      ...buildSchemaProps({}),
    },
    {
      key: "room_id",
      dataIndex: "room_id",
      title: "Phòng học",
      valueType: "select",
      request: async (params) =>
        fetchOption("/api/rooms", params, {
          value: "id",
          label: "room_name",
        }),
    },
    {
      key: "schedule_desc",
      dataIndex: "schedule_desc",
      title: "Ghi chú",
      valueType: "textarea",
      ...buildSchemaProps({ autoSize: { minRows: 3, maxRows: 6 } }),
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
      search: false,
      hideInDescriptions: true,
      render: (_, record) => renderDisplayClass(_, record, scheduleStatus),
    },
    {
      key: "displayTime",
      title: "Thời gian",
      render: renderDisplayTime,
      search: false,
      hideInDescriptions: true,
    },
  ];

  return buildSchema(schema, columnMapping);
}

export const schedulesMapping = {
  fields: [
    { key: "course_name", colProps: { xs: 12 } },
    { key: "module_name", colProps: { xs: 12 } },
    { key: "schedule_date", colProps: { xs: 12 } },
    { key: "shift_id", colProps: { xs: 12 } },
    { key: "schedule_status_id", colProps: { xs: 12 } },
    { key: "room_id", colProps: { xs: 12 } },
    { key: "lecture_id" },
    { key: "schedule_desc" },
    { key: "id" },
    { key: "class_id" },
    { key: "source_id" },
  ],
  columns: [
    { key: "displayClass" },
    { key: "displayTime" },
    { key: "shift_id", hideInTable: true },
    { key: "course_name", hideInTable: true, search: false },
    { key: "module_name", hideInTable: true, search: false },
    { key: "schedule_date", hideInTable: true, search: false },
    { key: "schedule_status_id", hideInTable: true },
    { key: "room_id", responsive: ["lg"], search: false },
    { key: "schedule_desc", responsive: ["xl"], search: false },
  ],
};
