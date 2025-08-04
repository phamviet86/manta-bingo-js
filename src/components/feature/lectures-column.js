// path: @/components/feature/lectures-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";
import { fetchOption } from "@/utils/fetch-util";
import { Space, Typography } from "antd";

export function lecturesColumn(params = {}, columnMapping = []) {
  const { lectureStatus, syllabusId } = params;

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
      title: "Học phần",
      valueType: "select",
      ...buildColumnProps({
        required: true,
        request: async (params) =>
          fetchOption("/api/modules", params, {
            value: "id",
            label: "module_name",
          }),
        params: { syllabus_id: syllabusId },
      }),
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
        colProps: { sm: 12 },
      }),
    },
    {
      key: "lecture_no",
      dataIndex: "lecture_no",
      title: "Số thứ tự",
      valueType: "digit",
      ...buildColumnProps({ style: { width: "100%" }, colProps: { sm: 12 } }),
    },
    {
      key: "lecture_desc",
      dataIndex: "lecture_desc",
      title: "Mô tả",
      valueType: "textarea",
      ...buildColumnProps({ autoSize: { minRows: 3, maxRows: 6 } }),
    },
    {
      key: "syllabus_name",
      dataIndex: "syllabus_name",
      title: "Giáo trình",
      valueType: "text",
    },
    {
      key: "module_name",
      dataIndex: "module_name",
      title: "Học phần",
      valueType: "text",
    },
    {
      key: "displayLecture",
      title: "Bài giảng",
      search: false,
      hideInForm: true,
      hideInDescriptions: true,
      render: (_, record) => (
        <Space wrap>
          <Typography.Text type="secondary">
            {record?.lecture_no}
          </Typography.Text>
          <Typography.Text strong>{record?.lecture_name}</Typography.Text>
        </Space>
      ),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const lecturesMapping = {
  default: [
    { key: "id" },
    { key: "module_name", hideInForm: true },
    {
      key: "module_id",
      search: false,
      hideInTable: true,
      hideInDescriptions: true,
    },
    { key: "displayLecture" },
    { key: "lecture_name", hidden: true },
    { key: "lecture_status_id", responsive: ["md"] },
    { key: "lecture_no", search: false, hidden: true, responsive: ["lg"] },
    { key: "lecture_desc", search: false, responsive: ["xl"] },
  ],
};
