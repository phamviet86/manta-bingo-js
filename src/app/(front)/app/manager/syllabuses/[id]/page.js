"use client";

import { use } from "react";
import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { Space } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  SyllabusesInfo,
  SyllabusesEdit,
  syllabusesSchema,
  syllabusesMapping,
  ModulesTable,
  ModulesCreate,
  ModulesEdit,
  modulesSchema,
  modulesMapping,
  LecturesTable,
  LecturesCreate,
  LecturesInfo,
  LecturesEdit,
  lecturesSchema,
  lecturesMapping,
} from "@/components/feature";
import { useTable, useInfo, useForm, useNavigate } from "@/hooks";
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
  const { syllabusStatus, moduleStatus, lectureStatus } = usePageContext();
  const { navBack } = useNavigate();
  const { id: syllabusId } = use(params);

  // Hooks
  const useSyllabuses = {
    info: useInfo(),
    edit: useForm(),
    columns: syllabusesSchema({ syllabusStatus }, syllabusesMapping.columns),
    fields: syllabusesSchema({ syllabusStatus }, syllabusesMapping.fields),
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
      onClick={() => useSyllabuses.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <SyllabusesInfo
        infoHook={useSyllabuses.info}
        requestParams={{ id: syllabusId }}
        onRequestSuccess={(result) =>
          useSyllabuses.info.setDataSource(result?.data?.[0])
        }
        columns={useSyllabuses.columns}
      />
      <SyllabusesEdit
        formHook={useSyllabuses.edit}
        fields={useSyllabuses.fields}
        requestParams={{ id: syllabusId }}
        onSubmitSuccess={useSyllabuses.info.reload}
        onDeleteSuccess={navBack}
        title="Chỉnh sửa giáo trình"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useSyllabuses.info?.dataSource?.syllabus_name || "Chi tiết";

  // MODULES TAB
  // Hooks
  const useModules = {
    table: useTable(),
    info: useInfo(),
    create: useForm(),
    edit: useForm(),
    columns: modulesSchema({ moduleStatus }, modulesMapping.columns),
    fields: modulesSchema({ moduleStatus }, modulesMapping.fields),
  };

  // Open info modal
  const openModulesInfo = (record) => {
    const { id } = record || {};
    useModules.info.setRequestParams({ id });
    useModules.info.open();
  };

  // Open edit form
  const openModulesEdit = (record) => {
    const { id } = record || {};
    useModules.edit.setRequestParams({ id });
    useModules.edit.setDeleteParams({ id });
    useModules.edit.open();
  };

  // modules tab buttons
  const modulesButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useModules.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => useModules.create.open()}
      />
    </Space>
  );

  // modules tab content
  const modulesContent = (
    <ProCard boxShadow bordered extra={modulesButton}>
      <ModulesTable
        tableHook={useModules.table}
        columns={useModules.columns}
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
                onClick={() => openModulesEdit(record)}
              />
            ),
          },
        ]}
        requestParams={{ syllabus_id: syllabusId }}
        showSearch={false}
        showPagination={false}
        syncToUrl={false}
      />
      <ModulesCreate
        formHook={useModules.create}
        fields={useModules.fields}
        onSubmitSuccess={() => useModules.table.reload()}
        initialValues={{ syllabus_id: syllabusId }}
        title="Tạo học phần"
        variant="drawer"
      />
      <ModulesEdit
        formHook={useModules.edit}
        fields={useModules.fields}
        requestParams={useModules.edit.requestParams}
        deleteParams={useModules.edit.deleteParams}
        onSubmitSuccess={() => useModules.table.reload()}
        onDeleteSuccess={() => useModules.table.reload()}
        title="Sửa học phần"
        variant="drawer"
      />
    </ProCard>
  );

  // modules tab configuration
  const modulesTab = {
    key: "modules",
    label: "Học phần",
    children: modulesContent,
  };

  // LECTURES TAB

  // Hooks
  const useLectures = {
    table: useTable(),
    info: useInfo(),
    create: useForm(),
    edit: useForm(),
    columns: lecturesSchema(
      { lectureStatus, syllabusId },
      lecturesMapping.columns
    ),
    fields: lecturesSchema(
      { lectureStatus, syllabusId },
      lecturesMapping.fields
    ),
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
        requestParams={{ syllabus_id: syllabusId }}
        syncToUrl={false}
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
        title="Tạo bài giảng"
        variant="drawer"
      />
      <LecturesEdit
        formHook={useLectures.edit}
        fields={useLectures.fields}
        requestParams={useLectures.edit.requestParams}
        deleteParams={useLectures.edit.deleteParams}
        onSubmitSuccess={() => useLectures.table.reload()}
        onDeleteSuccess={() => useLectures.table.reload()}
        title="Sửa bài giảng"
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
        { title: "Quản lý" },
        { title: "Giáo trình" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[modulesTab, lecturesTab]}
    />
  );
}
