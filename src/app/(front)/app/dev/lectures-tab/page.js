"use client";

import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { Space } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  LecturesTable,
  LecturesCreate,
  LecturesInfo,
  LecturesEdit,
  getLecturesColumn,
} from "@/components/feature";
import { useTable, useInfo, useForm } from "@/hooks";

export default function Page() {
  const pageButton = [];
  const pageContent = (
    <ProCard boxShadow bordered>
      {/* ...existing content or children if needed */}
    </ProCard>
  );
  const pageTitle = "Bài giảng Tab";

  // Hooks
  const useLectures = {
    table: useTable(),
    info: useInfo(),
    create: useForm(),
    edit: useForm(),
    columns: getLecturesColumn(),
  };

  // Open info modal
  const openLecturesInfo = (record) => {
    const { id } = record || {};
    useLectures.info.setRequestParams({ id });
    useLectures.info.open();
  };

  // Open edit form
  const openLecturesEdit = (record) => {
    const { id } = record || {};
    useLectures.edit.setRequestParams({ id });
    useLectures.edit.setDeleteParams({ id });
    useLectures.edit.open();
  };

  // lectures tab buttons
  const lecturesButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useLectures.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => useLectures.create.open()}
      />
    </Space>
  );

  // lectures tab content
  const lecturesContent = (
    <ProCard boxShadow bordered title="Danh sách" extra={lecturesButton}>
      <LecturesTable
        tableHook={useLectures.table}
        columns={useLectures.columns}
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
                onClick={() => openLecturesInfo(record)}
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
                onClick={() => openLecturesEdit(record)}
              />
            ),
          },
        ]}
      />
      <LecturesInfo
        infoHook={useLectures.info}
        columns={useLectures.columns}
        requestParams={useLectures.info.requestParams}
        title="Thông tin Bài giảng"
        variant="modal"
        column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
        size="small"
      />
      <LecturesCreate
        formHook={useLectures.create}
        columns={useLectures.columns}
        onSubmitSuccess={() => useLectures.table.reload()}
        title="Tạo Bài giảng"
        variant="drawer"
      />
      <LecturesEdit
        formHook={useLectures.edit}
        columns={useLectures.columns}
        requestParams={useLectures.edit.requestParams}
        deleteParams={useLectures.edit.deleteParams}
        onSubmitSuccess={() => useLectures.table.reload()}
        onDeleteSuccess={() => useLectures.table.reload()}
        title="Sửa Bài giảng"
        variant="drawer"
      />
    </ProCard>
  );

  // lectures tab configuration
  const lecturesTab = {
    key: "lectures",
    label: "Bài giảng",
    children: lecturesContent,
  };

  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "Bài giảng" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[lecturesTab]}
    />
  );
}
