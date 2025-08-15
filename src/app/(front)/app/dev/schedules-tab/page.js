"use client";

import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { Space } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  SchedulesCalendar,
  SchedulesEdit,
  schedulesSchema,
  schedulesMapping,
} from "@/components/feature";
import { useCalendar, useForm } from "@/hooks";

export default function Page() {
  const pageButton = [];
  const pageContent = <ProCard boxShadow bordered />;
  const pageTitle = "Lịch học Tab";

  // Hooks
  const useSchedules = {
    calendar: useCalendar(),
    edit: useForm(),
    fields: schedulesSchema({}, schedulesMapping.fields),
  };

  // Open edit form
  const openSchedulesEdit = (schedulesRecord) => {
    const { id } = schedulesRecord || {};
    useSchedules.edit.setRequestParams({ id });
    useSchedules.edit.setDeleteParams({ id });
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
        onClick={() => useSchedules.table.reload()}
      />
    </Space>
  );

  // schedules tab content
  const schedulesContent = (
    <ProCard boxShadow bordered title="Danh sách" extra={schedulesButton}>
      <SchedulesCalendar
        calendarHook={useSchedules.calendar}
        requestParams={{
          schedule_date_gte: useSchedules.calendar.startDate,
          schedule_date_lte: useSchedules.calendar.endDate,
        }}
        onEventClick={(info) => openSchedulesEdit(info.event)}
      />
      <SchedulesEdit
        formHook={useSchedules.edit}
        fields={useSchedules.fields}
        requestParams={useSchedules.edit.requestParams}
        deleteParams={useSchedules.edit.deleteParams}
        onSubmitSuccess={() => useSchedules.table.reload()}
        onDeleteSuccess={() => useSchedules.table.reload()}
        title="Sửa lịch học"
        variant="drawer"
      />
    </ProCard>
  );

  // schedules tab configuration
  const schedulesTab = {
    key: "schedules",
    label: "Lịch học",
    children: schedulesContent,
  };

  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "Lịch học" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[schedulesTab]}
    />
  );
}
