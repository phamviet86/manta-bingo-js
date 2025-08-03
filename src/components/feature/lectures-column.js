// path: @/components/feature/lectures-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function lecturesColumn(params = {}, columnMapping = []) {
  const { lectureStatus } = params;

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
      key: "module_id",
      dataIndex: "module_id",
      title: "ID Học phần",
      valueType: "text",
      hideInTable: true,
      hideInDescriptions: true,
      ...buildColumnProps({ disabled: true, hidden: true }),
    },
    {
      key: "lecture_name",
      dataIndex: "lecture_name",
      title: "Bài giảng",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "lecture_status_id",
      dataIndex: "lecture_status_id",
      title: "Trạng thái",
      valueType: "text",
      ...buildColumnProps({
        required: true,
        valueEnum: lectureStatus?.valueEnum,
        options: lectureStatus.options,
      }),
    },
    {
      key: "lecture_no",
      dataIndex: "lecture_no",
      title: "Số thứ tự",
      valueType: "digit",
    },
    {
      key: "lecture_desc",
      dataIndex: "lecture_desc",
      title: "Mô tả",
      valueType: "textarea",
      ...buildColumnProps({ autoSize: { minRows: 3, maxRows: 6 } }),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const lecturesMapping = {
  default: [],
};
