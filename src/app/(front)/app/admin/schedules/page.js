"use client";

import { useState } from "react";
import { ProCard } from "@ant-design/pro-components";
import { Space } from "antd";
import {
  AntPage,
  AntButton,
  ResponsiveCard,
  AntCalendar,
  headerRenderMonth,
} from "@/components/ui";
import {
  SchedulesEdit,
  schedulesSchema,
  schedulesMapping,
  classesSchema,
  classesMapping,
} from "@/components/feature";
import dayjs from "dayjs";
import { useTable, useForm } from "@/hooks";
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
    edit: useForm(),
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

  // reload data
  const reloadData = () => {
    useClasses.table.reload();
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
        title={`Tháng ${selectedDate.format("MM/YYYY")}`}
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
