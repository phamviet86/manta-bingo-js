// path: @/components/feature/modules-column.js

import {
  buildColumns,
  buildFieldProps,
  buildFormItemProps,
} from "@/utils/column-util";

export function getModulesColumn(params = {}, columnMapping = []) {
  const {} = params;

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
      key: "syllabus_id",
      dataIndex: "syllabus_id",
      title: "Giáo trình",
      valueType: "text",
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
    {
      key: "module_name",
      dataIndex: "module_name",
      title: "Tên học phần",
      valueType: "text",
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
    {
      key: "module_status_id",
      dataIndex: "module_status_id",
      title: "Trạng thái học phần",
      valueType: "text",
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
    {
      key: "module_desc",
      dataIndex: "module_desc",
      title: "Mô tả học phần",
      valueType: "text",
    },
  ];

  return buildColumns(schema, columnMapping);
}
