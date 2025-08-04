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
      ...buildColumnProps({ disabled: true, hidden: true }),
      hideInTable: true,
      hideInDescriptions: true,
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
      search: false,
      hideInTable: true,
      hideInDescriptions: true,
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
      valueType: "select",
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
      hideInForm: true,
    },
    {
      key: "module_name",
      dataIndex: "module_name",
      title: "Học phần",
      valueType: "text",
      hideInForm: true,
    },
    {
      key: "displayLecture",
      title: "Bài giảng",
      render: (_, record) => (
        <Space wrap>
          <Typography.Text type="secondary">
            {record?.lecture_no}
          </Typography.Text>
          <Typography.Text strong>{record?.lecture_name}</Typography.Text>
        </Space>
      ),
      search: false,
      hideInForm: true,
      hideInDescriptions: true,
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const lecturesMapping = {
  default: [
    { key: "id" },
    { key: "module_id" },
    { key: "syllabus_name" },
    { key: "module_name" },
    { key: "displayLecture" },
    { key: "lecture_name", hideInTable: true },
    { key: "lecture_status_id", responsive: ["md"] },
    { key: "lecture_no", hideInTable: true, search: false, responsive: ["lg"] },
    { key: "lecture_desc", search: false, responsive: ["xl"] },
  ],
};
