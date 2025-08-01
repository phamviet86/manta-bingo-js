// path: @/components/feature/users-column.js

import {
  buildColumns,
  buildFieldProps,
  buildFormItemProps,
} from "@/utils/column-util";
import { DiceBeerAvatar, SubLink } from "@/components/ui";

export function getUsersColumn(params = {}, columnMapping = []) {
  const { userStatus } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      search: false,
      hidden: true,
      fieldProps: buildFieldProps({
        disabled: true,
      }),
      formItemProps: buildFormItemProps({
        hidden: true,
      }),
      hideInDescriptions: true,
    },
    {
      key: "user_name",
      dataIndex: "user_name",
      title: "Người dùng",
      valueType: "text",
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
    {
      key: "user_desc",
      dataIndex: "user_desc",
      title: "Mô tả",
      valueType: "text",
      search: false,
      colProps: { sm: 12 },
    },
    {
      key: "user_status_id",
      dataIndex: "user_status_id",
      title: "Trạng thái",
      valueType: "select",
      valueEnum: userStatus.valueEnum || {},
      fieldProps: buildFieldProps({
        options: userStatus.options || [],
      }),
      formItemProps: buildFormItemProps({
        required: true,
      }),
      colProps: { sm: 12 },
    },
    {
      key: "user_email",
      dataIndex: "user_email",
      title: "Email",
      valueType: "text",
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
    {
      key: "user_phone",
      dataIndex: "user_phone",
      title: "Phone",
      valueType: "text",
      colProps: { sm: 12 },
    },
    {
      key: "user_parent_phone",
      dataIndex: "user_parent_phone",
      title: "Phone 2",
      valueType: "text",
      colProps: { sm: 12 },
    },
    {
      key: "user_avatar",
      dataIndex: "user_avatar",
      title: "Ảnh đại diện",
      valueType: "textarea",
      search: false,
      fieldProps: buildFieldProps({
        autoSize: { minRows: 1, maxRows: 3 },
      }),
      hideInDescriptions: true,
    },
    {
      key: "user_notes",
      dataIndex: "user_notes",
      title: "Ghi chú",
      valueType: "textarea",
      search: false,
      fieldProps: buildFieldProps({
        autoSize: { minRows: 3, maxRows: 6 },
      }),
    },
    {
      key: "displayAvatar",
      width: 68,
      align: "center",
      search: false,
      render: (_, record) => (
        <SubLink path={record?.id}>
          <DiceBeerAvatar
            src={record?.user_avatar}
            seed={record?.id}
            shape="square"
            size="large"
            alt="Ảnh đại diện"
          />
        </SubLink>
      ),
      hideInDescriptions: true,
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const ManagerUsersMapping = [
  { key: "displayAvatar" },
  { key: "id" },
  { key: "user_name" },
  { key: "user_desc" },
  { key: "user_status_id" },
  { key: "user_email" },
  { key: "user_phone" },
  { key: "user_parent_phone" },
  { key: "user_avatar" },
  { key: "user_notes" },
];
