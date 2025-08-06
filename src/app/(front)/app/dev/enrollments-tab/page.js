"use client";

import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { Space } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  EnrollmentsTable,
  EnrollmentsCreate,
  EnrollmentsInfo,
  EnrollmentsEdit,
  enrollmentsSchema,
} from "@/components/feature";
import { useTable, useInfo, useForm } from "@/hooks";

export default function Page() {
  const pageButton = [];
  const pageContent = <ProCard boxShadow bordered />;
  const pageTitle = "Đăng ký Tab";

  // Hooks
  const useEnrollments = {
    table: useTable(),
    info: useInfo(),
    create: useForm(),
    edit: useForm(),
    columns: enrollmentsSchema(),
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
        { title: "Hệ thống" },
        { title: "Đăng ký" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[enrollmentsTab]}
    />
  );
}
