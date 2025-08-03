// path: @/components/feature/rooms-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function getRoomsColumn(params = {}, columnMapping = []) {
  const { roomStatus } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
      hideInTable: true,
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
      search: false,
      ...buildColumnProps({ autoSize: { minRows: 3, maxRows: 6 } }),
      responsive: ["md"],
    },
  ];

  return buildColumns(schema, columnMapping);
}
