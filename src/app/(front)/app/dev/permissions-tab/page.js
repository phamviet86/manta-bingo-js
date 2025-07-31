// path: @/app/(front)/app/dev/permissions-tab/page.js

"use client";

import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { Row, Col, Card, Space } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  PermissionsTable,
  PermissionsCreate,
  PermissionsInfo,
  PermissionsEdit,
  getPermissionsColumn,
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
  const pageTitle = "Quyền Tab";

  // Hooks
  const usePermissions = {
    table: useTable(),
    info: useInfo(),
    create: useForm(),
    edit: useForm(),
    columns: getPermissionsColumn(),
  };

  // Open info modal
  const openPermissionsInfo = (record) => {
    const { id } = record || {};
    usePermissions.info.setRequestParams({ id });
    usePermissions.info.open();
  };

  // Open edit form
  const openPermissionsEdit = (record) => {
    const { id } = record || {};
    usePermissions.edit.setRequestParams({ id });
    usePermissions.edit.setDeleteParams({ id });
    usePermissions.edit.open();
  };

  // permissions tab buttons
  const permissionsButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => usePermissions.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => usePermissions.create.open()}
      />
    </Space>
  );

  // permissions tab content
  const permissionsContent = (
    <Row gutter={[16, 16]} wrap>
      <Col xs={24}>
        <Card hoverable title="Danh sách" extra={permissionsButton}>
          <PermissionsTable
            tableHook={usePermissions.table}
            columns={usePermissions.columns}
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
                    onClick={() => openPermissionsInfo(record)}
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
                    onClick={() => openPermissionsEdit(record)}
                  />
                ),
              },
            ]}
          />
          <PermissionsInfo
            infoHook={usePermissions.info}
            columns={usePermissions.columns}
            requestParams={usePermissions.info.requestParams}
            title="Thông tin Quyền"
            variant="modal"
            column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
            size="small"
          />
          <PermissionsCreate
            formHook={usePermissions.create}
            columns={usePermissions.columns}
            onSubmitSuccess={() => usePermissions.table.reload()}
            title="Tạo Quyền"
            variant="drawer"
          />
          <PermissionsEdit
            formHook={usePermissions.edit}
            columns={usePermissions.columns}
            requestParams={usePermissions.edit.requestParams}
            deleteParams={usePermissions.edit.deleteParams}
            onSubmitSuccess={() => usePermissions.table.reload()}
            onDeleteSuccess={() => usePermissions.table.reload()}
            title="Sửa Quyền"
            variant="drawer"
          />
        </Card>
      </Col>
    </Row>
  );

  // permissions tab configuration
  const permissionsTab = {
    key: "permissions",
    label: "Quyền",
    children: permissionsContent,
  };

  // Render
  return (
    <AntPage
      items={[{ title: "Hệ thống" }, { title: "Quyền" }, { title: "Chi tiết" }]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[permissionsTab]}
    />
  );
}
