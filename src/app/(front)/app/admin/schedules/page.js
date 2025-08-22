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
  AttendancesTable,
  AttendancesCreate,
  AttendancesInfo,
  AttendancesEdit,
  attendancesSchema,
  attendancesMapping,
} from "@/components/feature";
import dayjs from "dayjs";
import { useTable, useForm, useInfo } from "@/hooks";
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
  const { scheduleStatus, attendanceStatus, attendanceType } = usePageContext();

  // Calendar state
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Schedules Hooks
  const useSchedules = {
    table: useTable(),
    edit: useForm(),
    columns: schedulesSchema({ scheduleStatus }, schedulesMapping.columns),
    fields: schedulesSchema({ scheduleStatus }, schedulesMapping.fields),
  };

  // attendances hooks
  const useAttendances = {
    table: useTable(),
    info: useInfo(),
    create: useForm(),
    edit: useForm(),
    columns: attendancesSchema(
      { attendanceStatus, attendanceType },
      attendancesMapping.columns
    ),
    fields: attendancesSchema(
      { attendanceStatus, attendanceType },
      attendancesMapping.fields
    ),
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

  // Open info modal
  const openAttendancesInfo = (attendancesRecord) => {
    const { id } = attendancesRecord || {};
    useAttendances.info.setRequestParams({ id });
    useAttendances.info.open();
  };

  // Open edit form
  const openAttendancesEdit = (attendancesRecord) => {
    const { id } = attendancesRecord || {};
    useAttendances.edit.setRequestParams({ id });
    useAttendances.edit.setDeleteParams({ id });
    useAttendances.edit.open();
  };

  // attendances tab buttons
  const attendancesButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useAttendances.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => useAttendances.create.open()}
      />
    </Space>
  );

  // attendances tab content
  const attendancesContent = (
    <ProCard boxShadow bordered title="Danh sách" extra={attendancesButton}>
      <AttendancesTable
        tableHook={useAttendances.table}
        columns={useAttendances.columns}
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
                onClick={() => openAttendancesInfo(record)}
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
                onClick={() => openAttendancesEdit(record)}
              />
            ),
          },
        ]}
      />
      <AttendancesInfo
        infoHook={useAttendances.info}
        columns={useAttendances.columns}
        requestParams={useAttendances.info.requestParams}
        title="Thông tin điểm danh"
        variant="modal"
        column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
        size="small"
      />
      <AttendancesCreate
        formHook={useAttendances.create}
        fields={useAttendances.fields}
        onSubmitSuccess={() => useAttendances.table.reload()}
        title="Tạo điểm danh"
        variant="drawer"
      />
      <AttendancesEdit
        formHook={useAttendances.edit}
        fields={useAttendances.fields}
        requestParams={useAttendances.edit.requestParams}
        deleteParams={useAttendances.edit.deleteParams}
        onSubmitSuccess={() => useAttendances.table.reload()}
        onDeleteSuccess={() => useAttendances.table.reload()}
        title="Sửa điểm danh"
        variant="drawer"
      />
    </ProCard>
  );

  // attendances tab configuration
  const attendancesTab = {
    key: "attendances",
    label: "Điểm danh",
    children: attendancesContent,
  };

  // Render
  return (
    <AntPage
      items={[{ title: "Quản sinh" }, { title: "Lịch học" }]}
      title="Lịch học"
      extra={pageButton}
      content={pageContent}
      tabList={[attendancesTab]}
    />
  );
}
