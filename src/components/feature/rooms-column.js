// path: @/components/feature/rooms-column.js

import { buildColumns, fieldProps, formItemProps } from "@/utils/column-util";
import { options } from "@fullcalendar/core/preact";

export function getRoomsColumn(params = {}, columnMapping = []) {
  const { roomStatus } = params;

  console.log("roomStatus", roomStatus);

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      search: false,
      hidden: true,
      fieldProps: fieldProps({
        disabled: true,
      }),
      formItemProps: formItemProps({
        hidden: true,
      }),
    },
    {
      key: "room_name",
      dataIndex: "room_name",
      title: "Phòng học",
      valueType: "text",
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "room_status_id",
      dataIndex: "room_status_id",
      title: "Trạng thái",
      valueType: "select",
      valueEnum: roomStatus.valueEnum,
      fieldProps: fieldProps({
        options: roomStatus.options,
      }),
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "room_desc",
      dataIndex: "room_desc",
      title: "Mô tả",
      valueType: "textarea",
      fieldProps: fieldProps({
        autoSize: { minRows: 3, maxRows: 6 },
      }),
    },
  ];

  return buildColumns(schema, columnMapping);
}
