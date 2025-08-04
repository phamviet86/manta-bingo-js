// path: @/components/feature/rooms-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function roomsColumn(params = {}, columnMapping = []) {
  const { roomStatus } = params;

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
      key: "room_name",
      dataIndex: "room_name",
      title: "Phòng học",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "room_status_id",
      dataIndex: "room_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildColumnProps({
        required: true,
        valueEnum: roomStatus.valueEnum,
        options: roomStatus.options,
      }),
    },
    {
      key: "room_desc",
      dataIndex: "room_desc",
      title: "Mô tả",
      valueType: "textarea",
      ...buildColumnProps({
        autoSize: { minRows: 3, maxRows: 9 },
        search: false,
        responsive: ["md"],
      }),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const roomsMapping = {
  default: [],
};
