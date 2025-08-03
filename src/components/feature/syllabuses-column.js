// path: @/components/feature/syllabuses-column.js

import {
  buildColumns,
  buildColumnProps,
  buildFieldProps,
  buildFormItemProps,
} from "@/utils/column-util";

export function getSyllabusesColumn(params = {}, columnMapping = []) {
  const { syllabusStatus } = params;

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
      key: "syllabus_name",
      dataIndex: "syllabus_name",
      title: "Giáo trình",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "syllabus_status_id",
      dataIndex: "syllabus_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildColumnProps({
        required: true,
        valueEnum: syllabusStatus?.valueEnum,
        options: syllabusStatus.options,
      }),
    },
  ];

  return buildColumns(schema, columnMapping);
}
