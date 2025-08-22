// path: @/app/(front)/app/dev/attendances-tab/page.js

"use client";

import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { Space } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  AttendancesTable,
  AttendancesInfo,
  AttendancesEdit,
  attendancesSchema,
  attendancesMapping,
} from "@/components/feature";
import { useTable, useInfo, useForm } from "@/hooks";

export default function Page() {
  const pageButton = [];
  const pageContent = <ProCard hoverable bordered />;
  const pageTitle = "Điểm danh Tab";

  // Hooks
  const useAttendances = {
    table: useTable(),
    info: useInfo(),
    edit: useForm(),
    columns: attendancesSchema({}, attendancesMapping.columns),
    fields: attendancesSchema({}, attendancesMapping.fields),
  };

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
    </Space>
  );

  // attendances tab content
  const attendancesContent = (
    <ProCard hoverable bordered title="Danh sách" extra={attendancesButton}>
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
      items={[
        { title: "Hệ thống" },
        { title: "Điểm danh" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[attendancesTab]}
    />
  );
}
