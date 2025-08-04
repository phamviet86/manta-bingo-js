// path: @/app/(front)/app/system/roles/[id]/page.js

"use client";

import { use } from "react";
import { Space } from "antd";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/components/ui";
import {
  RolesInfo,
  RolesEdit,
  rolesColumn,
  PermissionsCreate,
  permissionsColumn,
  RolePermissionsTransferByRole,
} from "@/components/feature";
import { useInfo, useForm, useNavigate, useTransfer } from "@/hooks";
import { PageProvider, usePageContext } from "../provider";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent({ params }) {
  // Context
  const {} = usePageContext();
  const { navBack } = useNavigate();
  const { id: roleId } = use(params);

  // Hooks
  const useRoles = {
    info: useInfo(),
    edit: useForm(),
    columns: rolesColumn(),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="back-button"
      label="Quay lại"
      color="default"
      variant="outlined"
      onClick={navBack}
    />,
    <AntButton
      key="edit-button"
      label="Chỉnh sửa"
      color="primary"
      variant="solid"
      onClick={() => useRoles.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <RolesInfo
        infoHook={useRoles.info}
        columns={useRoles.columns}
        requestParams={{ id: roleId }}
        onRequestSuccess={(result) =>
          useRoles.info.setDataSource(result?.data?.[0])
        }
      />
      <RolesEdit
        formHook={useRoles.edit}
        columns={useRoles.columns}
        requestParams={{ id: roleId }}
        onSubmitSuccess={useRoles.info.reload}
        onDeleteSuccess={navBack}
        title="Chỉnh sửa vai trò"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useRoles.info?.dataSource?.role_name || "Chi tiết";

  // ROLE-PERMISSIONS TAB
  // Hooks
  const usePermissions = {
    create: useForm(),
    columns: permissionsColumn(),
  };

  const useRolePermissions = {
    transfer: useTransfer(),
  };

  // rolePermissions tab buttons
  const rolePermissionsButton = (
    <Space>
      <AntButton
        key="create-button"
        label="Tạo nhanh quyền"
        color="primary"
        variant="filled"
        onClick={() => usePermissions.create.open()}
      />
    </Space>
  );

  // rolePermissions tab content
  const rolePermissionsContent = (
    <ProCard boxShadow bordered extra={rolePermissionsButton}>
      <RolePermissionsTransferByRole
        transferHook={useRolePermissions.transfer}
        roleId={roleId}
      />
      <PermissionsCreate
        formHook={usePermissions.create}
        columns={usePermissions.columns}
        onSubmitSuccess={useRolePermissions.transfer.reload}
        title="Tạo quyền"
        variant="drawer"
      />
    </ProCard>
  );

  // rolePermissions tab configuration
  const rolePermissionsTab = {
    key: "rolePermissions",
    label: "Quyền truy cập",
    children: rolePermissionsContent,
  };

  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "Vai trò" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[rolePermissionsTab]}
    />
  );
}
