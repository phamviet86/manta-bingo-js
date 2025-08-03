// path: @/components/feature/modules-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function getModulesColumn(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildColumnProps({
        hideInTable: true,
        hideInDescriptions: true,
        disabled: true,
        hidden: true,
      }),
    },
    {
      key: "syllabus_id",
      dataIndex: "syllabus_id",
      title: "ID Giáo trình",
      valueType: "text",
      ...buildColumnProps({
        hideInTable: true,
        hideInDescriptions: true,
        disabled: true,
        hidden: true,
      }),
    },
    {
      key: "module_name",
      dataIndex: "module_name",
      title: "Học phần",
      valueType: "text",
      ...buildColumnProps({
        required: true,
      }),
    },
    {
      key: "module_status_id",
      dataIndex: "module_status_id",
      title: "Trạng thái",
      valueType: "text",
      ...buildColumnProps({
        required: true,
      }),
    },
    {
      key: "module_desc",
      dataIndex: "module_desc",
      title: "Mô tả",
      valueType: "textarea",
      ...buildColumnProps({
        autoSize: { minRows: 3, maxRows: 6 },
      }),
    },
  ];

  return buildColumns(schema, columnMapping);
}
