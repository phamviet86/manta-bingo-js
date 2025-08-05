// path: @/app/(front)/app/dev/classes/[id]/page.js

"use client";

import { use } from "react";
import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/components/ui";
import {
  ClassesInfo,
  ClassesEdit,
  classesColumn,
  classesMapping,
  EnrollmentsTable,
  EnrollmentsCreate,
  EnrollmentsInfo,
  EnrollmentsEdit,
  enrollmentsColumn,
  enrollmentsMapping,
} from "@/components/feature";
import { useInfo, useForm, useNavigate, useTable } from "@/hooks";
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
    classStatus,
    enrollmentType,
    enrollmentStatus,
    enrollmentPaymentType,
  } = usePageContext();
  const { navBack } = useNavigate();
  const { id: classesId } = use(params);

  // Hooks
  const useClasses = {
    info: useInfo(),
    edit: useForm(),
    columns: classesColumn({ classStatus }, classesMapping.default),
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
      onClick={() => useClasses.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <ClassesInfo
        infoHook={useClasses.info}
        requestParams={{ id: classesId }}
        onRequestSuccess={(result) =>
          useClasses.info.setDataSource(result?.data?.[0])
        }
        columns={useClasses.columns}
      />
      <ClassesEdit
        formHook={useClasses.edit}
        columns={useClasses.columns}
        requestParams={{ id: classesId }}
        onSubmitSuccess={useClasses.info.reload}
        onDeleteSuccess={navBack}
        title="Chỉnh sửa lớp học"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useClasses.info?.dataSource?.classStartDate || "Chi tiết";

  // ENROLLMENTS TAB
  // Hooks
  const useEnrollments = {
    table: useTable(),
    info: useInfo(),
    create: useForm(),
    edit: useForm(),
    columns: enrollmentsColumn(
      {
        enrollmentType,
        enrollmentStatus,
        enrollmentPaymentType,
      },
      enrollmentsMapping.classPage
    ),
  };

  // Open info modal
  const openEnrollmentsInfo = (record) => {
    const { id } = record || {};
    useEnrollments.info.setRequestParams({ id });
    useEnrollments.info.open();
  };

  // Open edit form
  const openEnrollmentsEdit = (record) => {
    const { id } = record || {};
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
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => useEnrollments.create.open()}
      />
    </Space>
  );

  // enrollments tab content
  const enrollmentsContent = (
    <ProCard boxShadow bordered title="Danh sách" extra={enrollmentsButton}>
      <EnrollmentsTable
        tableHook={useEnrollments.table}
        columns={useEnrollments.columns}
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
      <EnrollmentsCreate
        formHook={useEnrollments.create}
        columns={useEnrollments.columns}
        onSubmitSuccess={() => useEnrollments.table.reload()}
        title="Tạo đăng ký"
        variant="drawer"
      />
      <EnrollmentsEdit
        formHook={useEnrollments.edit}
        columns={useEnrollments.columns}
        requestParams={useEnrollments.edit.requestParams}
        deleteParams={useEnrollments.edit.deleteParams}
        onSubmitSuccess={() => useEnrollments.table.reload()}
        onDeleteSuccess={() => useEnrollments.table.reload()}
        title="Sửa đăng ký"
        variant="drawer"
      />
    </ProCard>
  );

  // enrollments tab configuration
  const enrollmentsTab = {
    key: "enrollments",
    label: "Đăng ký",
    children: enrollmentsContent,
  };

  // Render
  return (
    <AntPage
      items={[
        { title: "Quản lý" },
        { title: "Lớp học" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[enrollmentsTab]}
    />
  );
}
