// path: @/app/(front)/app/dev/options/page.js

"use client";

import { InfoCircleOutlined } from "@ant-design/icons";
import { Row, Col, Card } from "antd";
import { AntPage, AntButton, PathButton } from "@/components/ui";
import {
  OptionsTable,
  OptionsCreate,
  getOptionsColumn,
} from "@/components/feature";
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
  const useOptions = {
    table: useTable(),
    create: useForm(),
    columns: getOptionsColumn(),
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
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useOptions.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <Row gutter={[16, 16]} wrap>
      <Col xs={24}>
        <Card hoverable>
          <OptionsTable
            tableHook={useOptions.table}
            columns={useOptions.columns}
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
          <OptionsCreate
            formHook={useOptions.create}
            columns={useOptions.columns}
            onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
            title="Tạo tuỳ chọn"
            variant="drawer"
          />
        </Card>
      </Col>
    </Row>
  );

  // Render
  return (
    <AntPage
      items={[{ title: "Hệ thống" }, { title: "Tùy chọn" }]}
      title="Danh sách"
      extra={pageButton}
      content={pageContent}
    />
  );
}
