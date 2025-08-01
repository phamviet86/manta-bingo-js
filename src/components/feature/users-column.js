// path: @/components/feature/users-column.js

import { buildColumns, fieldProps, formItemProps } from "@/utils/column-util";

export function getUsersColumn(params = {}, columnMapping = []) {
  const {} = params;

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
      key: "user_name",
      dataIndex: "user_name",
      title: "Tên người dùng",
      valueType: "text",
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "user_status_id",
      dataIndex: "user_status_id",
      title: "Trạng thái người dùng",
      valueType: "text",
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "user_email",
      dataIndex: "user_email",
      title: "Email người dùng",
      valueType: "text",
      formItemProps: formItemProps({
        required: true,
      }),
    },
    {
      key: "user_phone",
      dataIndex: "user_phone",
      title: "Số điện thoại",
      valueType: "text",
    },
    {
      key: "user_parent_phone",
      dataIndex: "user_parent_phone",
      title: "Số điện thoại phụ huynh",
      valueType: "text",
    },
  ];

  return buildColumns(schema, columnMapping);
}
