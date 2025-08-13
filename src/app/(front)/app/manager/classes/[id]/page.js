// path: @/app/(front)/app/dev/classes/[id]/page.js

"use client";

import { use, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Space, Dropdown } from "antd";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, DiceBeerAvatar } from "@/components/ui";
import {
  ClassesInfo,
  ClassesEdit,
  classesSchema,
  classesMapping,
  EnrollmentsTable,
  EnrollmentsInfo,
  EnrollmentsEdit,
  enrollmentsSchema,
  enrollmentsMapping,
  EnrollmentsTransferByClass,
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
    classStatus,
    enrollmentType,
    enrollmentStatus,
    enrollmentPaymentType,
  } = usePageContext();
  const { navBack } = useNavigate();
  const { id: classId } = use(params);

  // Hooks
  const useClasses = {
    info: useInfo(),
    edit: useForm(),
    columns: classesSchema({ classStatus }, classesMapping.columns),
    fields: classesSchema({ classStatus }, classesMapping.fields),
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
        requestParams={{ id: classId }}
        onRequestSuccess={(result) =>
          useClasses.info.setDataSource(result?.data?.[0])
        }
        columns={useClasses.columns}
      />
      <ClassesEdit
        formHook={useClasses.edit}
        fields={useClasses.fields}
        requestParams={{ id: classId }}
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
    edit: useForm(),
    columns: enrollmentsSchema(
      {
        enrollmentType,
        enrollmentStatus,
        enrollmentPaymentType,
      },
      enrollmentsMapping.classEnrollmentsColumns
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

  // Open transfer modal: adding teacher
  const openTeacherTransfer = () => {
    setTypeId(26);
    setPaymentTypeId(30);
    useEnrollments.transfer.open();
  };

  // Open transfer modal: adding assistant
  const openAssistantTransfer = () => {
    setTypeId(27);
    setPaymentTypeId(30);
    useEnrollments.transfer.open();
  };

  // Open transfer modal: adding student
  const openStudentTransfer = () => {
    setTypeId(28);
    setPaymentTypeId(30);
    useEnrollments.transfer.open();
  };

  // Close transfer modal
  const closeTransferModal = () => {
    useEnrollments.table.reload();

    setTypeId(undefined);
    setPaymentTypeId(undefined);

    useEnrollments.transfer.close();
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
      <Dropdown.Button
        key="add-teacher"
        type="primary"
        variant="solid"
        onClick={openTeacherTransfer}
        menu={{
          items: [
            {
              key: "add-assistant",
              label: "Thêm trợ giảng",
              onClick: openAssistantTransfer,
            },
            {
              key: "add-student",
              label: "Thêm học viên",
              onClick: openStudentTransfer,
            },
          ],
        }}
      >
        Thêm giáo viên
      </Dropdown.Button>
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
            width: 68,
            align: "center",
            search: false,
            render: (_, record) => (
              <DiceBeerAvatar
                src={record?.user_avatar}
                seed={record?.user_id}
                shape="square"
                size="large"
                alt="Ảnh đại diện"
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
        requestParams={{ class_id: classId }}
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
      <EnrollmentsTransferByClass
        transferHook={useEnrollments.transfer}
        classId={classId}
        enrollmentTypeId={typeId}
        enrollmentPaymentTypeId={paymentTypeId}
        variant="modal"
        title="Xếp lớp"
        afterClose={closeTransferModal}
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
