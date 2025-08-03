// path: @/components/feature/lectures-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function getLecturesColumn(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildColumnProps({
        disabled: true,
        hidden: true,
      }),
      hideInTable: true,
      hideInDescriptions: true,
    },
    {
      key: "module_id",
      dataIndex: "module_id",
      title: "Mã học phần",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "lecture_name",
      dataIndex: "lecture_name",
      title: "Tên bài giảng",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "lecture_status_id",
      dataIndex: "lecture_status_id",
      title: "Trạng thái bài giảng",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "lecture_no",
      dataIndex: "lecture_no",
      title: "Số thứ tự bài giảng",
      valueType: "text",
    },
    {
      key: "lecture_desc",
      dataIndex: "lecture_desc",
      title: "Mô tả bài giảng",
      valueType: "text",
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const lecturesMapping = {
  default: [],
};
