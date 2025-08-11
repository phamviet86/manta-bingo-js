"use client";

import { EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/components/ui";
import {
  SchedulesTable,
  SchedulesCreate,
  SchedulesEdit,
  schedulesSchema,
  schedulesMapping,
  SchedulesCalendar,
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
  const { scheduleStatus } = usePageContext();

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
      onClick={() => useSchedules.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useSchedules.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <SchedulesCalendar calendarHook={useSchedules.calendar} />
      {/* <SchedulesTable
        tableHook={useSchedules.table}
        columns={useSchedules.columns}
        rightColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => {
              return (
                <AntButton
                  icon={<EditOutlined />}
                  color="primary"
                  variant="link"
                  onClick={() => openSchedulesEdit(record)}
                />
              );
            },
          },
        ]}
      /> */}
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

  // Render
  return (
    <AntPage
      items={[{ title: "Development" }, { title: "Lịch học" }]}
      title="Lịch học"
      extra={pageButton}
      content={pageContent}
    />
  );
}
