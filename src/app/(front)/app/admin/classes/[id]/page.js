// path: @/app/(front)/app/admin/classes/[id]/page.js

"use client";

import { use, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Space } from "antd";
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
  SchedulesCalendar,
  SchedulesEdit,
  schedulesSchema,
  schedulesMapping,
} from "@/components/feature";
import {
  useInfo,
  useForm,
  useNavigate,
  useTable,
  useTransfer,
  useCalendar,
} from "@/hooks";
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
    scheduleStatus,
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
    <ProCard hoverable bordered>
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
  const pageTitle =
    `${useClasses.info?.dataSource?.course_name} - ${useClasses.info?.dataSource?.module_name}` ||
    "Chi tiết";

  // SCHEDULE TAB
  // Hooks
  const useSchedules = {
    calendar: useCalendar(),
    edit: useForm(),
    fields: schedulesSchema({ scheduleStatus }, schedulesMapping.fields),
  };

  // Open edit form
  const openSchedulesEdit = (schedulesRecord) => {
    const { id } = schedulesRecord || {};
    useSchedules.edit.setRequestParams({ id });
    useSchedules.edit.open();
  };

  // schedules tab buttons
  const schedulesButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useSchedules.calendar.reload()}
      />
    </Space>
  );

  // schedules tab content
  const schedulesContent = (
    <ProCard hoverable bordered title="Danh sách" extra={schedulesButton}>
      <SchedulesCalendar
        calendarHook={useSchedules.calendar}
        requestParams={{
          schedule_date_gte: useSchedules.calendar.startDate,
          schedule_date_lte: useSchedules.calendar.endDate,
          class_id_e: classId,
        }}
        onEventClick={(info) => openSchedulesEdit(info.event)}
      />
      <SchedulesEdit
        formHook={useSchedules.edit}
        fields={useSchedules.fields}
        requestParams={useSchedules.edit.requestParams}
        deleteParams={useSchedules.edit.deleteParams}
        onSubmitSuccess={() => useSchedules.calendar.reload()}
        title="Sửa lịch học"
        variant="drawer"
        showDelete={false}
      />
    </ProCard>
  );

  // schedules tab configuration
  const schedulesTab = {
    key: "schedules",
    label: "Lịch học",
    children: schedulesContent,
  };

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

  // Close transfer modal
  const closeTransferModal = () => {
    useEnrollments.table.reload();
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
      <AntButton
        key="add-student"
        label="Thêm học viên"
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
              <DiceBeerAvatar
                src={record?.user_avatar}
                seed={record?.user_id}
                shape="square"
                size="large"
                alt="Ảnh đại diện"
                onClick={() => {
                  record?.enrollment_type_id == 28
                    ? openEnrollmentsInfo(record)
                    : null;
                }}
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
                disabled={record?.enrollment_type_id == 28 ? false : true}
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
        showDelete={false}
      />
      <EnrollmentsTransferByClass
        transferHook={useEnrollments.transfer}
        classId={classId}
        enrollmentTypeId={28}
        enrollmentPaymentTypeId={30}
        variant="modal"
        title="Xếp lớp"
        afterClose={closeTransferModal}
        targetItem={{
          key: "user_id",
          disabled: [
            { column: "enrollment_status_id", notIn: [20, 23] },
            { column: "enrollment_type_id", notIn: [28] },
          ],
        }}
      />
    </ProCard>
  );

  // enrollments tab configuration
  const enrollmentsTab = {
    key: "enrollments",
    label: "Danh sách lớp",
    children: enrollmentsContent,
  };

  // Render
  return (
    <AntPage
      items={[
        { title: "Quản sinh" },
        { title: "Lớp học" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[schedulesTab, enrollmentsTab]}
    />
  );
}
