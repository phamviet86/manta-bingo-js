// OPTIONS LIST PAGE

"use client";

import { Col, Row, Card, Space } from "antd";
import { SettingOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { AntPage, AntButton, PathButton } from "@/component/common";
import { OptionsTable, getOptionsColumn } from "@/component/custom";
import { useTable } from "@/component/hook";
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
  const { optionColor } = usePageContext();

  // Option logic hooks
  const useOptions = {
    table: useTable(),
    columns: getOptionsColumn({ optionColor }, []),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useOptions.table.reload()}
    />,
    <PathButton
      key="new-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      path="new"
    />,
  ];

  // Main content
  const pageContent = (
    <Row wrap gutter={[16, 16]} justify="left">
      <Col span={24}>
        <Card hoverable>
          <OptionsTable
            tableHook={useOptions.table}
            columns={useOptions.columns}
            rightColumns={[
              {
                width: 56,
                align: "center",
                search: false,
                render: (_, record) => (
                  <PathButton
                    icon={<InfoCircleOutlined />}
                    color="primary"
                    variant="link"
                    path={record?.id}
                  />
                ),
              },
            ]}
          />
        </Card>
      </Col>
    </Row>
  );

  // Render
  return (
    <AntPage
      items={[
        {
          title: (
            <Space>
              <SettingOutlined />
              <span>Hệ thống</span>
            </Space>
          ),
        },
        { title: "Tùy chọn" },
      ]}
      title="Danh sách tùy chọn"
      extra={pageButton}
      content={pageContent}
    />
  );
}
