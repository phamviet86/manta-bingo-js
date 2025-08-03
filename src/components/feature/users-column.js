// path: @/components/feature/users-column.js

import { Space, Typography } from "antd";
import { DiceBeerAvatar, SubLink } from "@/components/ui";
import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function usersColumn(params = {}, columnMapping = []) {
  const { userStatus } = params;

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
      key: "user_name",
      dataIndex: "user_name",
      title: "Người dùng",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "user_desc",
      dataIndex: "user_desc",
      title: "Mô tả",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "user_status_id",
      dataIndex: "user_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildColumnProps({
        required: true,
        valueEnum: userStatus.valueEnum,
        options: userStatus.options,
        colProps: { sm: 12 },
      }),
    },
    {
      key: "user_email",
      dataIndex: "user_email",
      title: "Email",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "user_phone",
      dataIndex: "user_phone",
      title: "Phone",
      valueType: "text",
      ...buildColumnProps({ colProps: { sm: 12 } }),
    },
    {
      key: "user_parent_phone",
      dataIndex: "user_parent_phone",
      title: "Phone 2",
      valueType: "text",
      ...buildColumnProps({ colProps: { sm: 12 } }),
    },
    {
      key: "user_avatar",
      dataIndex: "user_avatar",
      title: "Ảnh đại diện",
      valueType: "textarea",
      hideInDescriptions: true,
      ...buildColumnProps({ autoSize: { minRows: 1, maxRows: 3 } }),
    },
    {
      key: "user_notes",
      dataIndex: "user_notes",
      title: "Ghi chú",
      valueType: "textarea",
      ...buildColumnProps({ autoSize: { minRows: 3, maxRows: 6 } }),
    },
    {
      key: "displayAvatar",
      width: 68,
      align: "center",
      search: false,
      hideInForm: true,
      hideInDescriptions: true,
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
    },
    {
      key: "displayUser",
      title: "Người dùng",
      search: false,
      hideInForm: true,
      hideInDescriptions: true,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{record?.user_name}</Typography.Text>
          <Typography.Text type="secondary">
            {record?.user_desc}
          </Typography.Text>
        </Space>
      ),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const usersMapping = {
  default: [
    { key: "displayAvatar" },
    { key: "displayUser" },
    { key: "id" },
    { key: "user_name", hidden: true },
    { key: "user_desc", hidden: true },
    { key: "user_status_id", responsive: ["sm"] },
    { key: "user_email", responsive: ["md"] },
    { key: "user_phone", hidden: true, responsive: ["lg"] },
    { key: "user_parent_phone", hidden: true },
    { key: "user_avatar", search: false, hidden: true },
    { key: "user_notes", search: false, responsive: ["xl"] },
  ],
};
