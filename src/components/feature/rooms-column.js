// path: @/components/feature/rooms-column.js

import {
  buildColumns,
  buildFieldProps,
  buildFormItemProps,
} from "@/utils/column-util";

export function getRoomsColumn(params = {}, columnMapping = []) {
  const { roomStatus } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      search: false,
      hidden: true,
      fieldProps: buildFieldProps({
        disabled: true,
      }),
      formItemProps: buildFormItemProps({
        hidden: true,
      }),
    },
    {
      key: "room_name",
      dataIndex: "room_name",
      title: "Phòng học",
      valueType: "text",
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
    {
      key: "room_status_id",
      dataIndex: "room_status_id",
      title: "Trạng thái",
      valueType: "select",
      valueEnum: roomStatus.valueEnum,
      fieldProps: buildFieldProps({
        options: roomStatus.options,
      }),
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
    {
      key: "room_desc",
      dataIndex: "room_desc",
      title: "Mô tả",
      valueType: "textarea",
      search: false,
      fieldProps: buildFieldProps({
        autoSize: { minRows: 3, maxRows: 6 },
      }),
      responsive: ["md"],
    },
  ];

  return buildColumns(schema, columnMapping);
}
