"use client";

import { ProCard } from "@ant-design/pro-components";
import { Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { AntPage, AntButton } from "@/components/ui";
import {
  SchedulesCreate,
  SchedulesEdit,
  schedulesSchema,
  schedulesMapping,
  SchedulesCalendar,
  ClassesSummaryTable,
  classesSchema,
  classesMapping,
} from "@/components/feature";
import { useTable, useForm, useCalendar } from "@/hooks";
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

  // Schedules Hooks
  const useSchedules = {
    create: useForm(),
    edit: useForm(),
    calendar: useCalendar(),
    fields: schedulesSchema({ scheduleStatus }, schedulesMapping.fields),
  };

  // classes Hooks
  const useClasses = {
    table: useTable(),
    columns: classesSchema(
      { classStatus },
      classesMapping.scheduleClassesColumns
    ),
    fields: classesSchema({ classStatus }, classesMapping.fields),
  };

  // Open schedule create
  const openSchedulesCreate = (classRecord) => {
    const { id, course_name, module_name } = classRecord || {};
    useSchedules.create.setInitialValues({
      class_id: id,
      course_name: course_name,
      module_name: module_name,
    });
    useSchedules.create.open();
  };

  // reload data
  const reloadData = () => {
    useSchedules.calendar.reload();
    useClasses.table.reload();
  };

  // Open edit
  const openSchedulesEdit = (scheduleRecord) => {
    const { id } = scheduleRecord || {};
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
      onClick={reloadData}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <SchedulesCalendar
        calendarHook={useSchedules.calendar}
        requestParams={{
          schedule_date_gte: useSchedules.calendar.startDate,
          schedule_date_lte: useSchedules.calendar.endDate,
        }}
        eventClick={(info) => openSchedulesEdit(info.event)}
      />
      <SchedulesCreate
        formHook={useSchedules.create}
        fields={useSchedules.fields}
        initialValues={useSchedules.create.initialValues}
        onSubmitSuccess={reloadData}
        title="Tạo lịch học"
        variant="drawer"
      />
      <SchedulesEdit
        formHook={useSchedules.edit}
        fields={useSchedules.fields}
        requestParams={useSchedules.edit.requestParams}
        onSubmitSuccess={reloadData}
        deleteParams={useSchedules.edit.deleteParams}
        onDeleteSuccess={reloadData}
        title="Chỉnh sửa lịch học"
        variant="drawer"
      />
    </ProCard>
  );

  // CLASSES TAB
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
    </Space>
  );

  // classes tab content
  const classesContent = (
    <ProCard
      boxShadow
      bordered
      title="Danh sách lớp"
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
                icon={<PlusCircleOutlined />}
                color="primary"
                variant="link"
                onClick={() => openSchedulesCreate(record)}
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
          start_date_e: useSchedules.calendar.startDate,
          end_date_e: useSchedules.calendar.endDate,
        }}
        syncToUrl={false}
        startDate={useSchedules.calendar.startDate}
        endDate={useSchedules.calendar.endDate}
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
