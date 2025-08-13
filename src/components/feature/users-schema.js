// path: @/components/feature/users-schema.js

import { Space, Typography, Tooltip } from "antd";
import { IdcardTwoTone } from "@ant-design/icons";
import { DiceBeerAvatar, SubLink } from "@/components/ui";
import { buildSchema, buildSchemaProps } from "@/utils/schema-util";

export function usersSchema(params = {}, columnMapping = []) {
  const { userStatus } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "user_name",
      dataIndex: "user_name",
      title: "Người dùng",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "user_desc",
      dataIndex: "user_desc",
      title: "Mô tả",
      valueType: "text",
      ...buildSchemaProps({}),
    },
    {
      key: "user_status_id",
      dataIndex: "user_status_id",
      title: "Trạng thái",
      valueType: "select",
      ...buildSchemaProps({
        rules: [{ required: true }],
        valueEnum: userStatus.valueEnum,
        options: userStatus.options,
      }),
    },
    {
      key: "user_email",
      dataIndex: "user_email",
      title: "Email",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "user_phone",
      dataIndex: "user_phone",
      title: "Phone",
      valueType: "text",
    },
    {
      key: "user_parent_phone",
      dataIndex: "user_parent_phone",
      title: "Phone 2",
      valueType: "text",
    },
    {
      key: "user_avatar",
      dataIndex: "user_avatar",
      title: "Ảnh đại diện",
      valueType: "textarea",
      ...buildSchemaProps({ autoSize: { minRows: 1, maxRows: 6 } }),
    },
    {
      key: "user_notes",
      dataIndex: "user_notes",
      title: "Ghi chú",
      valueType: "textarea",
      ...buildSchemaProps({ autoSize: { minRows: 3, maxRows: 9 } }),
    },
    {
      key: "role_names",
      dataIndex: "role_names",
      title: "Phân quyền",
      valueType: "textarea",
      ...buildSchemaProps({ autoSize: { minRows: 3, maxRows: 9 } }),
    },
    {
      key: "displayAvatar",
      width: 68,
      align: "center",
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
      search: false,
      hideInDescriptions: true,
    },
    {
      key: "displayUser",
      title: "Người dùng",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Space>
            {record.role_names ? (
              <Tooltip title="Nhân viên" color="blue">
                <IdcardTwoTone />
              </Tooltip>
            ) : null}
            <Typography.Text strong>{record?.user_name}</Typography.Text>
          </Space>
          <Typography.Text type="secondary">
            {record?.user_desc}
          </Typography.Text>
        </Space>
      ),
      search: false,
      hideInDescriptions: true,
    },
  ];

  return buildSchema(schema, columnMapping);
}

export const usersMapping = {
  fields: [
    { key: "id" },
    { key: "user_name" },
    { key: "user_desc", colProps: { sm: 12 } },
    { key: "user_status_id", colProps: { sm: 12 } },
    { key: "user_email" },
    { key: "user_phone", colProps: { sm: 12 } },
    { key: "user_parent_phone", colProps: { sm: 12 } },
    { key: "user_avatar" },
    { key: "user_notes" },
  ],
  columns: [
    { key: "displayAvatar" },
    { key: "displayUser" },
    { key: "user_name", hideInTable: true },
    { key: "user_desc", hideInTable: true },
    { key: "user_status_id", responsive: ["sm"] },
    { key: "user_email", responsive: ["md"] },
    { key: "user_phone", hideInTable: true },
    { key: "user_parent_phone", hideInTable: true },
    { key: "role_names", responsive: ["xl"] },
    { key: "user_notes", responsive: ["xl"] },
  ],
  adminColumns: [
    { key: "displayAvatar" },
    { key: "displayUser" },
    { key: "user_name", hideInTable: true },
    { key: "user_desc", hideInTable: true },
    { key: "user_status_id", responsive: ["sm"] },
    { key: "user_email", responsive: ["md"] },
    { key: "user_phone", responsive: ["lg"] },
    { key: "user_parent_phone", responsive: ["lg"] },
    { key: "role_names", hideInTable: true, search: false },
    { key: "user_notes", hideInTable: true },
  ],
};
