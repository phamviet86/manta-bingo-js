"use client";

import { use } from "react";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/components/ui";
import {
  UsersInfo,
  UsersEdit,
  usersSchema,
  usersMapping,
} from "@/components/feature";
import { useInfo, useForm, useNavigate } from "@/hooks";
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
  const { id: userId } = use(params);

  // Hooks
  const useUsers = {
    info: useInfo(),
    edit: useForm(),
    columns: usersSchema({}, usersMapping.columns),
    fields: usersSchema({}, usersMapping.fields),
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
      onClick={() => useUsers.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <UsersInfo
        infoHook={useUsers.info}
        requestParams={{ id: userId }}
        onRequestSuccess={(result) =>
          useUsers.info.setDataSource(result?.data?.[0])
        }
        columns={useUsers.columns}
      />
      <UsersEdit
        formHook={useUsers.edit}
        fields={useUsers.fields}
        requestParams={{ id: userId }}
        onSubmitSuccess={useUsers.info.reload}
        onDeleteSuccess={navBack}
        title="Chỉnh sửa Người dùng"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useUsers.info?.dataSource?.user_name || "Chi tiết";

  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "Người dùng" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
