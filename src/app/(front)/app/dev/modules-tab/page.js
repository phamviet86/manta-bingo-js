"use client";

import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard, Space } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  ModulesTable,
  ModulesCreate,
  ModulesInfo,
  ModulesEdit,
  getModulesColumn,
} from "@/components/feature";
import { useTable, useInfo, useForm } from "@/hooks";

export default function Page() {
  const pageButton = [];
  const pageContent = <ProCard boxShadow bordered />;
  const pageTitle = "Học phần Tab";

  // MODULES TAB
  // Hooks
  const useModules = {
    table: useTable(),
    info: useInfo(),
    create: useForm(),
    edit: useForm(),
    columns: getModulesColumn(),
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
    <ProCard boxShadow bordered title="Danh sách" extra={modulesButton}>
      <ModulesTable
        tableHook={useModules.table}
        columns={useModules.columns}
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
                onClick={() => openModulesInfo(record)}
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
                onClick={() => openModulesEdit(record)}
              />
            ),
          },
        ]}
      />
      <ModulesInfo
        infoHook={useModules.info}
        columns={useModules.columns}
        requestParams={useModules.info.requestParams}
        title="Thông tin học phần"
        variant="modal"
        column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
        size="small"
      />
      <ModulesCreate
        formHook={useModules.create}
        columns={useModules.columns}
        onSubmitSuccess={() => useModules.table.reload()}
        title="Tạo học phần"
        variant="drawer"
      />
      <ModulesEdit
        formHook={useModules.edit}
        columns={useModules.columns}
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

  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "Học phần" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[modulesTab]}
    />
  );
}
