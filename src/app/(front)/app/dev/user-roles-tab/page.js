"use client";

import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { Row, Col, Card, Space } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  UserRolesTable,
  UserRolesCreate,
  UserRolesInfo,
  UserRolesEdit,
  getUserRolesColumn,
} from "@/components/feature";
import { useTable, useInfo, useForm } from "@/hooks";

export default function Page() {
  const pageButton = [];
  const pageContent = (
    <Row gutter={[16, 16]} wrap>
      <Col xs={24}>
        <Card hoverable />
      </Col>
    </Row>
  );
  const pageTitle = "Phân quyền Tab";

  // Hooks
  const useUserRoles = {
    table: useTable(),
    info: useInfo(),
    create: useForm(),
    edit: useForm(),
    columns: getUserRolesColumn(),
  };

  // Open info modal
  const openUserRolesInfo = (record) => {
    const { id } = record || {};
    useUserRoles.info.setRequestParams({ id });
    useUserRoles.info.open();
  };

  // Open edit form
  const openUserRolesEdit = (record) => {
    const { id } = record || {};
    useUserRoles.edit.setRequestParams({ id });
    useUserRoles.edit.setDeleteParams({ id });
    useUserRoles.edit.open();
  };

  // userRoles tab buttons
  const userRolesButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useUserRoles.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => useUserRoles.create.open()}
      />
    </Space>
  );

  // userRoles tab content
  const userRolesContent = (
    <Row gutter={[16, 16]} wrap>
      <Col xs={24}>
        <Card hoverable title="Danh sách" extra={userRolesButton}>
          <UserRolesTable
            tableHook={useUserRoles.table}
            columns={useUserRoles.columns}
            leftColumns={[
              {
                width: 56,
                align: "center",
                search: false,
                render: (_, record) => (
                  <AntButton
                    icon={<InfoCircleOutlined />}
                    color="primary"
                    variant="link"
                    onClick={() => openUserRolesInfo(record)}
                  />
                ),
              },
            ]}
            rightColumns={[
              {
                width: 56,
                align: "center",
                search: false,
                render: (_, record) => (
                  <AntButton
                    icon={<EditOutlined />}
                    color="primary"
                    variant="link"
                    onClick={() => openUserRolesEdit(record)}
                  />
                ),
              },
            ]}
          />
          <UserRolesInfo
            infoHook={useUserRoles.info}
            columns={useUserRoles.columns}
            requestParams={useUserRoles.info.requestParams}
            title="Thông tin phân quyền"
            variant="modal"
            column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
            size="small"
          />
          <UserRolesCreate
            formHook={useUserRoles.create}
            columns={useUserRoles.columns}
            onSubmitSuccess={() => useUserRoles.table.reload()}
            title="Tạo phân quyền"
            variant="drawer"
          />
          <UserRolesEdit
            formHook={useUserRoles.edit}
            columns={useUserRoles.columns}
            requestParams={useUserRoles.edit.requestParams}
            deleteParams={useUserRoles.edit.deleteParams}
            onSubmitSuccess={() => useUserRoles.table.reload()}
            onDeleteSuccess={() => useUserRoles.table.reload()}
            title="Sửa phân quyền"
            variant="drawer"
          />
        </Card>
      </Col>
    </Row>
  );

  // userRoles tab configuration
  const userRolesTab = {
    key: "user-roles",
    label: "Phân quyền",
    children: userRolesContent,
  };

  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "Phân quyền" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[userRolesTab]}
    />
  );
}
