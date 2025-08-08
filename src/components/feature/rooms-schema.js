// path: @/components/feature/rooms-schema.js

import { buildSchema, buildSchemaProps } from "@/utils/schema-util";

export function roomsSchema(params = {}, columnMapping = []) {
  const { roomStatus } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "room_name",
      dataIndex: "room_name",
      title: "Phòng học",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "room_status_id",
      dataIndex: "room_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildSchemaProps({
        rules: [{ required: true }],
        valueEnum: roomStatus.valueEnum,
        options: roomStatus.options,
      }),
    },
    {
      key: "room_desc",
      dataIndex: "room_desc",
      title: "Mô tả",
      valueType: "textarea",
      ...buildSchemaProps({ autoSize: { minRows: 3, maxRows: 9 } }),
    },
  ];

  return buildSchema(schema, columnMapping);
}

export const roomsMapping = {
  fields: [
    { key: "id" },
    { key: "room_name" },
    { key: "room_status_id" },
    { key: "room_desc" },
  ],
  columns: [
    { key: "room_name" },
    { key: "room_status_id" },
    { key: "room_desc", search: false, responsive: ["md"] },
  ],
};
