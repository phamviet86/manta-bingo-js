"use client";

import { InfoCircleOutlined } from "@ant-design/icons";
import { Row, Col, Card } from "antd";
import { AntPage, AntButton, PathButton } from "@/components/ui";
import { UsersTable, UsersCreate, getUsersColumn } from "@/components/feature";
import { useTable, useForm, useNavigate } from "@/hooks";
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
  const {} = usePageContext();
  const { navDetail } = useNavigate();

  // Hooks
  const useUsers = {
    table: useTable(),
    create: useForm(),
    columns: getUsersColumn(),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useUsers.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useUsers.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <Row gutter={[16, 16]} wrap>
      <Col xs={24}>
        <Card hoverable>
          <UsersTable
            tableHook={useUsers.table}
            columns={useUsers.columns}
            rightColumns={[
              {
                width: 56,
                align: "center",
                search: false,
                render: (_, record) => {
                  return (
                    <PathButton
                      icon={<InfoCircleOutlined />}
                      color="primary"
                      variant="link"
                      path={record?.id}
                    />
                  );
                },
              },
            ]}
          />
          <UsersCreate
            formHook={useUsers.create}
            columns={useUsers.columns}
            onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
            title="Tạo người dùng"
            variant="drawer"
          />
        </Card>
      </Col>
    </Row>
  );

  // Render
  return (
    <AntPage
      items={[{ title: "Development" }, { title: "người dùng" }]}
      title="người dùng"
      extra={pageButton}
      content={pageContent}
    />
  );
}
