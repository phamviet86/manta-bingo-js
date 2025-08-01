// path: @/components/feature/shifts-column.js

import { buildColumns, fieldProps, formItemProps } from "@/utils/column-util";

export function getShiftsColumn(params = {}, columnMapping = []) {
  const {} = params;

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
      key: "shift_name",
      dataIndex: "shift_name",
      title: "Tên ca học",
      valueType: "text",
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "shift_status_id",
      dataIndex: "shift_status_id",
      title: "Trạng thái",
      valueType: "text",
      search: false,
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "shift_start_time",
      dataIndex: "shift_start_time",
      title: "Giờ bắt đầu",
      valueType: "text",
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "shift_end_time",
      dataIndex: "shift_end_time",
      title: "Giờ kết thúc",
      valueType: "text",
      search: false,
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "shift_desc",
      dataIndex: "shift_desc",
      title: "Mô tả",
      valueType: "text",
      search: false,
    },
  ];

  return buildColumns(schema, columnMapping);
}
