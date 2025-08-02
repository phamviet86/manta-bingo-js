// path: @/app/(front)/app/system/permissions/page.js

"use client";

import { EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/components/ui";
import {
  PermissionsTable,
  PermissionsCreate,
  PermissionsEdit,
  getPermissionsColumn,
} from "@/components/feature";
import { useTable, useForm } from "@/hooks";
import { PageProvider, usePageContext } from "./provider";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent() {
  // Context
  const {} = usePageContext();

  // Hooks
  const usePermissions = {
    table: useTable(),
    create: useForm(),
    edit: useForm(),
    columns: getPermissionsColumn(),
  };

  // Open edit
  const openPermissionsEdit = (record) => {
    const { id } = record || {};
    usePermissions.edit.setRequestParams({ id });
    usePermissions.edit.setDeleteParams({ id });
    usePermissions.edit.open();
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => usePermissions.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => usePermissions.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <PermissionsTable
        tableHook={usePermissions.table}
        columns={usePermissions.columns}
        rightColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => {
              return (
                <AntButton
                  icon={<EditOutlined />}
                  color="primary"
                  variant="link"
                  onClick={() => openPermissionsEdit(record)}
                />
              );
            },
          },
        ]}
      />
      <PermissionsCreate
        formHook={usePermissions.create}
        columns={usePermissions.columns}
        onSubmitSuccess={usePermissions.table.reload}
        title="Tạo quyền"
        variant="drawer"
      />
      <PermissionsEdit
        formHook={usePermissions.edit}
        columns={usePermissions.columns}
        requestParams={usePermissions.edit.requestParams}
        onSubmitSuccess={usePermissions.table.reload}
        deleteParams={usePermissions.edit.deleteParams}
        onDeleteSuccess={usePermissions.table.reload}
        title="Chỉnh sửa quyền"
        variant="drawer"
      />
    </ProCard>
  );

  // Render
  return (
    <AntPage
      items={[{ title: "Hệ thống" }, { title: "Quyền" }]}
      title="Quyền"
      extra={pageButton}
      content={pageContent}
    />
  );
}
