"use client";

import { use, useState } from "react";
import { ProCard } from "@ant-design/pro-components";
import {
  AntPage,
  AntButton,
  ResponsiveCard,
  DiceBeerImage,
} from "@/components/ui";
import {
  UsersInfo,
  UsersEdit,
  usersSchema,
  usersMapping,
  UsersResetPassword,
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
  const { userStatus } = usePageContext();
  const { navBack } = useNavigate();
  const { id: userId } = use(params);

  // State để quản lý disable/enable nút edit
  const [disableUserEdit, setDisableUserEdit] = useState(true);

  // Hooks
  const useUsers = {
    info: useInfo(),
    edit: useForm(),
    columns: usersSchema({ userStatus }, usersMapping.adminColumns),
    fields: usersSchema({ userStatus }, usersMapping.fields),
  };

  // script
  const checkUserEditable = (userData) => {
    const hasRoles = userData?.role_names && userData.role_names.length > 0;
    setDisableUserEdit(hasRoles);
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
    // Mặc định disable, chỉ enable khi role_names rỗng
    <AntButton
      key="edit-button"
      label="Chỉnh sửa"
      color="primary"
      variant="solid"
      onClick={() => useUsers.edit.open()}
      disabled={disableUserEdit}
    />,
  ];

  // Main content
  const pageContent = (
    <ResponsiveCard
      boxShadow
      bordered
      splitAt="md"
      actions={
        <UsersResetPassword userId={userId} disabled={disableUserEdit} />
      }
    >
      <ProCard colSpan={{ sm: 24, md: "240px" }} layout="center">
        <DiceBeerImage
          src={useUsers.info?.dataSource?.user_avatar}
          seed={userId}
          style={{ maxWidth: "240px", maxHeight: "240px" }}
        />
      </ProCard>
      <ProCard>
        <UsersInfo
          infoHook={useUsers.info}
          requestParams={{ id: userId }}
          onRequestSuccess={(result) => {
            useUsers.info.setDataSource(result?.data?.[0]);
            // Kiểm tra role_names để quyết định enable/disable nút edit
            checkUserEditable(result?.data?.[0]);
          }}
          columns={useUsers.columns}
          column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
        />
        <UsersEdit
          formHook={useUsers.edit}
          fields={useUsers.fields}
          requestParams={{ id: userId }}
          onSubmitSuccess={useUsers.info.reload}
          onDeleteSuccess={navBack}
          title="Chỉnh sửa người dùng"
          variant="drawer"
          showDelete={false}
        />
      </ProCard>
    </ResponsiveCard>
  );

  // Page title
  const pageTitle = useUsers.info?.dataSource?.user_name || "Chi tiết";

  // Render
  return (
    <AntPage
      items={[
        { title: "Quản sinh" },
        { title: "Liên hệ" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
