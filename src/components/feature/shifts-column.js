// path: @/components/feature/shifts-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function shiftsColumn(params = {}, columnMapping = []) {
  const { shiftStatus } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildColumnProps({ disabled: true, hidden: true }),
      hideInTable: true,
      hideInDescriptions: true,
    },
    {
      key: "shift_name",
      dataIndex: "shift_name",
      title: "Ca học",
      valueType: "text",
      ...buildColumnProps({ rules: [{ required: true }] }),
    },
    {
      key: "shift_status_id",
      dataIndex: "shift_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildColumnProps({
        rules: [{ required: true }],
        options: shiftStatus.options,
        valueEnum: shiftStatus.valueEnum,
      }),
    },
    {
      key: "shift_start_time",
      dataIndex: "shift_start_time",
      title: "Giờ bắt đầu",
      valueType: "time",
      ...buildColumnProps({
        rules: [{ required: true }],
        format: "HH:mm",
        style: { width: "100%" },
        colProps: { xs: 12 },
      }),
      search: false,
      responsive: ["md"],
    },
    {
      key: "shift_end_time",
      dataIndex: "shift_end_time",
      title: "Giờ kết thúc",
      valueType: "time",
      ...buildColumnProps({
        rules: [{ required: true }],
        format: "HH:mm",
        style: { width: "100%" },
        colProps: { xs: 12 },
      }),
      search: false,
      responsive: ["md"],
    },
    {
      key: "shift_desc",
      dataIndex: "shift_desc",
      title: "Mô tả",
      valueType: "textarea",
      ...buildColumnProps({ autoSize: { minRows: 3, maxRows: 9 } }),
      search: false,
      responsive: ["lg"],
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const shiftsMapping = {
  default: [],
};
