// path: @/components/feature/syllabuses-column.js

import {
  buildColumns,
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
      fieldProps: buildFieldProps({
        disabled: true,
      }),
      formItemProps: buildFormItemProps({
        hidden: true,
      }),
      search: false,
      hidden: true,
      hideInDescriptions: true,
    },
    {
      key: "syllabus_name",
      dataIndex: "syllabus_name",
      title: "Giáo trình",
      valueType: "text",
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
    {
      key: "syllabus_status_id",
      dataIndex: "syllabus_status_id",
      title: "Trạng thái",
      valueType: "select",
      valueEnum: syllabusStatus?.valueEnum,
      fieldProps: buildFieldProps({
        options: syllabusStatus.options,
      }),
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
  ];

  return buildColumns(schema, columnMapping);
}
