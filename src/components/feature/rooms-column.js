// path: @/components/feature/rooms-column.js

import { convertColumns } from "@/utils/convert-util";

export function getRoomsColumn(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      fieldProps: {
        disabled: true,
      },
      formItemProps: {
        style: { display: "none" },
      },
      hideInDescriptions: true,
      hideInTable: true,
    },
    {
      key: "room_name",
      dataIndex: "room_name",
      title: "Phòng học",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      key: "room_status_id",
      dataIndex: "room_status_id",
      title: "Trạng thái",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      key: "room_desc",
      dataIndex: "room_desc",
      title: "Mô tả",
      valueType: "textarea",
      fieldProps: { autoSize: { minRows: 3, maxRows: 6 } },
    },
  ];

  return convertColumns(schema, columnMapping);
}
