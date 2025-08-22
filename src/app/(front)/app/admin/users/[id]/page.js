"use client";

import { use, useState } from "react";
import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
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
  EnrollmentsTable,
  EnrollmentsInfo,
  EnrollmentsEdit,
  enrollmentsSchema,
  enrollmentsMapping,
  EnrollmentsTransferByUser,
} from "@/components/feature";
import { useInfo, useForm, useNavigate, useTable, useTransfer } from "@/hooks";
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
  const {
    userStatus,
    enrollmentType,
    enrollmentStatus,
    enrollmentPaymentType,
  } = usePageContext();
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
      hoverable
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

  // ENROLLMENTS TAB
  // Hooks
  const useEnrollments = {
    table: useTable(),
    info: useInfo(),
    edit: useForm(),
    columns: enrollmentsSchema(
      {
        enrollmentType,
        enrollmentStatus,
        enrollmentPaymentType,
      },
      enrollmentsMapping.userEnrollmentsColumns
    ),
    fields: enrollmentsSchema(
      {
        enrollmentType,
        enrollmentStatus,
        enrollmentPaymentType,
      },
      enrollmentsMapping.fields
    ),
    transfer: useTransfer(),
  };

  const [typeId, setTypeId] = useState();
  const [paymentTypeId, setPaymentTypeId] = useState();

  // Open info modal
  const openEnrollmentsInfo = (enrollmentRecord) => {
    const { id } = enrollmentRecord || {};
    useEnrollments.info.setRequestParams({ id });
    useEnrollments.info.open();
  };

  // Open edit form
  const openEnrollmentsEdit = (enrollmentRecord) => {
    const { id } = enrollmentRecord || {};
    useEnrollments.edit.setRequestParams({ id });
    useEnrollments.edit.setDeleteParams({ id });
    useEnrollments.edit.open();
  };

  // enrollments tab buttons
  const enrollmentsButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useEnrollments.table.reload()}
      />
      <AntButton
        key="add-student"
        label="Xếp lớp"
        color="primary"
        variant="solid"
        onClick={() => useEnrollments.transfer.open()}
      />
    </Space>
  );

  // enrollments tab content
  const enrollmentsContent = (
    <ProCard hoverable bordered extra={enrollmentsButton}>
      <EnrollmentsTable
        tableHook={useEnrollments.table}
        columns={useEnrollments.columns}
        leftColumns={[
          {
            width: 68,
            align: "center",
            search: false,
            render: (_, record) => (
              <AntButton
                icon={<InfoCircleOutlined />}
                color="primary"
                variant="link"
                onClick={() => openEnrollmentsInfo(record)}
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
                onClick={() => openEnrollmentsEdit(record)}
              />
            ),
          },
        ]}
        requestParams={{ user_id: userId }}
        syncToUrl={false}
      />
      <EnrollmentsInfo
        infoHook={useEnrollments.info}
        columns={useEnrollments.columns}
        requestParams={useEnrollments.info.requestParams}
        title="Thông tin đăng ký"
        variant="modal"
        column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
        size="small"
      />
      <EnrollmentsEdit
        formHook={useEnrollments.edit}
        fields={useEnrollments.fields}
        requestParams={useEnrollments.edit.requestParams}
        deleteParams={useEnrollments.edit.deleteParams}
        onSubmitSuccess={() => useEnrollments.table.reload()}
        onDeleteSuccess={() => useEnrollments.table.reload()}
        title="Sửa đăng ký"
        variant="drawer"
      />
      <EnrollmentsTransferByUser
        transferHook={useEnrollments.transfer}
        userId={userId}
        enrollmentTypeId={28}
        enrollmentPaymentTypeId={30}
        variant="modal"
        title="Xếp lớp"
        afterClose={() => useEnrollments.table.reload()}
      />
    </ProCard>
  );

  // const disabled content
  const disabledContent = (
    <ProCard hoverable bordered>
      <Typography.Text type="secondary">
        Nội dung bị vô hiệu hóa
      </Typography.Text>
    </ProCard>
  );

  // enrollments tab configuration
  const enrollmentsTab = {
    key: "enrollments",
    label: "Xếp lớp",
    children: disableUserEdit ? disabledContent : enrollmentsContent,
    disabled: disableUserEdit,
  };

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
      tabList={[enrollmentsTab]}
    />
  );
}
