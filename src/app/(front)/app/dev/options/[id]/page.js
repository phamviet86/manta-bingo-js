// path: @/app/(front)/app/dev/options/[id]/tab.js

"use client";

import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { Row, Col, Card, Space } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  OptionsTable,
  OptionsCreate,
  OptionsInfo,
  OptionsEdit,
  getOptionsColumn,
} from "@/components/feature";
import { useTable, useInfo, useForm } from "@/hooks";

export default function Page() {
  const pageButton = [];
  const pageContent = (
    <Row gutter={[16, 16]} wrap>
      <Col xs={24}>
        <Card hoverable />
      </Col>
    </Row>
  );
  const pageTitle = "Chi tiết";

  // Hooks
  const useOptions = {
    table: useTable(),
    info: useInfo(),
    create: useForm(),
    edit: useForm(),
    columns: getOptionsColumn(),
  };

  // Open info modal
  const openOptionsInfo = (record) => {
    const { id } = record || {};
    useOptions.info.setRequestParams({ id });
    useOptions.info.open();
  };

  // Open edit form
  const openOptionsEdit = (record) => {
    const { id } = record || {};
    useOptions.edit.setRequestParams({ id });
    useOptions.edit.setDeleteParams({ id });
    useOptions.edit.open();
  };

  // Options tab buttons
  const optionsButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useOptions.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => useOptions.create.open()}
      />
    </Space>
  );

  // Options tab content
  const optionsContent = (
    <Row gutter={[16, 16]} wrap>
      <Col xs={24}>
        <Card hoverable title="Danh sách" extra={optionsButton}>
          <OptionsTable
            tableHook={useOptions.table}
            columns={useOptions.columns}
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
                    onClick={() => openOptionsInfo(record)}
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
                    onClick={() => openOptionsEdit(record)}
                  />
                ),
              },
            ]}
          />
          <OptionsInfo
            infoHook={useOptions.info}
            columns={useOptions.columns}
            requestParams={useOptions.info.requestParams}
            title="Thông tin tùy chọn"
            variant="modal"
            column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
            size="small"
          />
          <OptionsCreate
            formHook={useOptions.create}
            columns={useOptions.columns}
            onSubmitSuccess={() => useOptions.table.reload()}
            title="Tạo tùy chọn"
            variant="drawer"
          />
          <OptionsEdit
            formHook={useOptions.edit}
            columns={useOptions.columns}
            requestParams={useOptions.edit.requestParams}
            deleteParams={useOptions.edit.deleteParams}
            onSubmitSuccess={() => useOptions.table.reload()}
            onDeleteSuccess={() => useOptions.table.reload()}
            title="Sửa tùy chọn"
            variant="drawer"
          />
        </Card>
      </Col>
    </Row>
  );

  // Options tab configuration
  const optionsTab = {
    key: "options",
    label: "Tùy chọn",
    children: optionsContent,
  };

  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "Tùy chọn" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[optionsTab]}
    />
  );
}
