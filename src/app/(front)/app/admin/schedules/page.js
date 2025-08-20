"use client";

import { useState } from "react";
import { Space } from "antd";
import { ProCard } from "@ant-design/pro-components";
import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import {
  AntPage,
  AntButton,
  SubPathButton,
  ResponsiveCard,
  AntCalendar,
  headerRenderMonth,
} from "@/components/ui";
import {
  SchedulesTable,
  SchedulesEdit,
  schedulesSchema,
  schedulesMapping,
  classesSchema,
  classesMapping,
} from "@/components/feature";
import dayjs from "dayjs";
import { useTable, useForm, useNavigate } from "@/hooks";
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

  // Calendar state
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Schedules Hooks
  const useSchedules = {
    table: useTable(),
    edit: useForm(),
    columns: schedulesSchema({ scheduleStatus }, schedulesMapping.columns),
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

  // Handlers
  const openSchedulesEdit = (optionRecord) => {
    const { id } = optionRecord || {};
    useSchedules.edit.setRequestParams({ id });
    useSchedules.edit.setDeleteParams({ id });
    useSchedules.edit.open();
  };

  // reload data
  const reloadData = () => {
    useSchedules.table.reload();
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
    <ResponsiveCard boxShadow bordered splitAt="md">
      <ProCard
        colSpan={{ sm: 24, md: "300px" }}
        layout="center"
        title={`Ngày ${selectedDate.format("YYYY-MM-DD")}`}
      >
        <AntCalendar
          fullscreen={false}
          mode="month"
          value={selectedDate}
          onChange={setSelectedDate}
          headerRender={headerRenderMonth}
        />
      </ProCard>
      <ProCard>
        <SchedulesTable
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
          requestParams={{ schedule_date_e: selectedDate.format("YYYY-MM-DD") }}
          size="small"
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
          showDelete={false}
        />
      </ProCard>
    </ResponsiveCard>
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
    <ProCard boxShadow bordered title="Danh sách lớp" extra={classesButton}>
      {/* ClassesSummaryTable removed */}
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
      items={[{ title: "Quản sinh" }, { title: "Lịch học" }]}
      title="Lịch học"
      extra={pageButton}
      content={pageContent}
      tabList={[classesTab]}
    />
  );
}
