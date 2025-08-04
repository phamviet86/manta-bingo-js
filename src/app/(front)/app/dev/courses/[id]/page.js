"use client";

import { use } from "react";
import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/components/ui";
import {
  CoursesInfo,
  CoursesEdit,
  coursesColumn,
  ClassesTable,
  ClassesInfo,
  ClassesEdit,
  classesColumn,
  classesMapping,
  ClassesTransferByCourse,
} from "@/components/feature";
import { useTable, useInfo, useForm, useNavigate, useTransfer } from "@/hooks";
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
  const { classStatus } = usePageContext();
  const { navBack } = useNavigate();
  const { id: courseId } = use(params);

  // Hooks
  const useCourses = {
    info: useInfo(),
    edit: useForm(),
    columns: coursesColumn(),
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
      onClick={() => useCourses.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <CoursesInfo
        infoHook={useCourses.info}
        requestParams={{ id: courseId }}
        onRequestSuccess={(result) =>
          useCourses.info.setDataSource(result?.data?.[0])
        }
        columns={useCourses.columns}
      />
      <CoursesEdit
        formHook={useCourses.edit}
        columns={useCourses.columns}
        requestParams={{ id: courseId }}
        onSubmitSuccess={useCourses.info.reload}
        onDeleteSuccess={navBack}
        title="Chỉnh sửa khóa học"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useCourses.info?.dataSource?.course_name || "Chi tiết";

  // CLASSES TAB

  // Hooks
  const useClasses = {
    table: useTable(),
    info: useInfo(),
    edit: useForm(),
    columns: classesColumn({ classStatus }, classesMapping.default),
    transfer: useTransfer(),
  };

  // Open info modal
  const openClassesInfo = (record) => {
    const { id } = record || {};
    useClasses.info.setRequestParams({ id });
    useClasses.info.open();
  };

  // Open edit form
  const openClassesEdit = (record) => {
    const { id } = record || {};
    useClasses.edit.setRequestParams({ id });
    useClasses.edit.setDeleteParams({ id });
    useClasses.edit.open();
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
    <ProCard boxShadow bordered title="Danh sách" extra={classesButton}>
      <ClassesTable
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
                onClick={() => openClassesEdit(record)}
              />
            ),
          },
        ]}
      />
      <ClassesTransferByCourse
        transferHook={useClasses.transfer}
        courseId={courseId}
        variant="modal"
        title="Thêm lớp"
        afterClose={() => useClasses.table.reload()}
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
      <ClassesEdit
        formHook={useClasses.edit}
        columns={useClasses.columns}
        requestParams={useClasses.edit.requestParams}
        deleteParams={useClasses.edit.deleteParams}
        onSubmitSuccess={() => useClasses.table.reload()}
        onDeleteSuccess={() => useClasses.table.reload()}
        title="Sửa lớp học"
        variant="drawer"
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
      items={[
        { title: "Hệ thống" },
        { title: "Khóa học" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[classesTab]}
    />
  );
}
