"use client";

import { ProCard } from "@ant-design/pro-components";
import { Space } from "antd";
import { InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { AntPage, AntButton } from "@/components/ui";
import {
  SchedulesCreate,
  SchedulesEdit,
  schedulesSchema,
  schedulesMapping,
  SchedulesCalendar,
  ClassesSummaryTable,
  ClassesInfo,
  classesSchema,
  classesMapping,
} from "@/components/feature";
import { useTable, useForm, useCalendar, useInfo } from "@/hooks";
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
  const { scheduleStatus, classStatus } = usePageContext();

  // Hooks
  const useSchedules = {
    table: useTable(),
    create: useForm(),
    edit: useForm(),
    calendar: useCalendar(),
    columns: schedulesSchema({ scheduleStatus }, schedulesMapping.columns),
    fields: schedulesSchema({ scheduleStatus }, schedulesMapping.fields),
  };

  // Open edit
  const openSchedulesEdit = (record) => {
    const { id } = record || {};
    useSchedules.edit.setRequestParams({ id });
    useSchedules.edit.setDeleteParams({ id });
    useSchedules.edit.open();
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useSchedules.calendar.reload()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <SchedulesCalendar calendarHook={useSchedules.calendar} />
      <SchedulesCreate
        formHook={useSchedules.create}
        fields={useSchedules.fields}
        onSubmitSuccess={useSchedules.table.reload}
        title="Tạo lịch học"
        variant="drawer"
      />
      <SchedulesEdit
        formHook={useSchedules.edit}
        fields={useSchedules.fields}
        requestParams={useSchedules.edit.requestParams}
        onSubmitSuccess={useSchedules.table.reload}
        deleteParams={useSchedules.edit.deleteParams}
        onDeleteSuccess={useSchedules.table.reload}
        title="Chỉnh sửa lịch học"
        variant="drawer"
      />
    </ProCard>
  );

  // CLASSES TAB
  // Hooks
  const useClasses = {
    table: useTable(),
    info: useInfo(),
    columns: classesSchema(
      { classStatus },
      classesMapping.scheduleClassesColumns
    ),
    fields: classesSchema({ classStatus }, classesMapping.fields),
  };

  // Open info modal
  const openClassesInfo = (record) => {
    const { id } = record || {};
    useClasses.info.setRequestParams({ id });
    useClasses.info.open();
  };

  // classes tab buttons
  const classesButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useClasses.table.reload()}
      />
      <AntButton
        key="edit-button"
        label="Thêm lớp"
        color="primary"
        variant="solid"
        onClick={() => useClasses.transfer.open()}
      />
      ,
    </Space>
  );

  // classes tab content
  const classesContent = (
    <ProCard
      boxShadow
      bordered
      title="Danh sách"
      extra={classesButton}
      loading={
        !useSchedules.calendar.endDate || !useSchedules.calendar.startDate
      }
    >
      <ClassesSummaryTable
        tableHook={useClasses.table}
        columns={useClasses.columns}
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
                onClick={() => openClassesInfo(record)}
              />
            ),
          },
        ]}
        requestParams={{
          class_start_date_lte: useSchedules.calendar.endDate,
          or: {
            class_end_date_gte: useSchedules.calendar.startDate,
            class_end_date_null: true,
          },
        }}
        syncToUrl={false}
        startDate={useSchedules.calendar.startDate}
        endDate={useSchedules.calendar.endDate}
      />
      <ClassesInfo
        infoHook={useClasses.info}
        columns={useClasses.columns}
        requestParams={useClasses.info.requestParams}
        title="Thông tin lớp học"
        variant="modal"
        column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
        size="small"
      />
    </ProCard>
  );

  // classes tab configuration
  const classesTab = {
    key: "classes",
    label: "Lớp học",
    children: classesContent,
  };

  // Render
  return (
    <AntPage
      items={[{ title: "Development" }, { title: "Lịch học" }]}
      title="Lịch học"
      extra={pageButton}
      content={pageContent}
      tabList={[classesTab]}
    />
  );
}
