// path: @/components/feature/shifts-column.js

import { buildColumns, fieldProps, formItemProps } from "@/utils/column-util";

export function getShiftsColumn(params = {}, columnMapping = []) {
  const { shiftStatus } = params;

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
      title: "Ca học",
      valueType: "text",
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "shift_status_id",
      dataIndex: "shift_status_id",
      title: "Trạng thái",
      valueType: "select",
      valueEnum: shiftStatus.valueEnum,
      fieldProps: fieldProps({
        options: shiftStatus.options,
      }),
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "shift_start_time",
      dataIndex: "shift_start_time",
      title: "Giờ bắt đầu",
      valueType: "time",
      search: false,
      fieldProps: fieldProps({
        format: "HH:mm",
        style: { width: "100%" },
      }),
      formItemProps: formItemProps({
        required: true,
      }),
      colProps: { xs: 12 },
      responsive: ["md"],
    },
    {
      key: "shift_end_time",
      dataIndex: "shift_end_time",
      title: "Giờ kết thúc",
      valueType: "time",
      search: false,
      fieldProps: fieldProps({
        format: "HH:mm",
        style: { width: "100%" },
      }),
      formItemProps: formItemProps({
        required: true,
      }),
      colProps: { xs: 12 },
      responsive: ["md"],
    },
    {
      key: "shift_desc",
      dataIndex: "shift_desc",
      title: "Mô tả",
      valueType: "textarea",
      search: false,
      fieldProps: fieldProps({
        autoSize: { minRows: 3, maxRows: 6 },
      }),
      responsive: ["lg"],
    },
  ];

  return buildColumns(schema, columnMapping);
}
