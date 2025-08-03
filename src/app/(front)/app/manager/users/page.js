"use client";

import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/components/ui";
import {
  UsersTable,
  UsersCreate,
  usersColumn,
  usersMapping,
} from "@/components/feature";
import { useTable, useForm, useNavigate } from "@/hooks";
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
  const { userStatus } = usePageContext();
  const { navDetail } = useNavigate();

  // Hooks
  const useUsers = {
    table: useTable(),
    create: useForm(),
    columns: usersColumn({ userStatus }, usersMapping.default),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useUsers.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useUsers.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <UsersTable tableHook={useUsers.table} columns={useUsers.columns} />
      <UsersCreate
        formHook={useUsers.create}
        columns={useUsers.columns}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo người dùng"
        variant="drawer"
      />
    </ProCard>
  );

  // Render
  return (
    <AntPage
      items={[{ title: "Development" }, { title: "Người dùng" }]}
      title="Người dùng"
      extra={pageButton}
      content={pageContent}
    />
  );
}
