// path: @/app/(front)/app/system/options/page.js

"use client";

import { Row, Col, Card } from "antd";
import { AntPage, AntButton } from "@/components/ui";
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

  // Page action buttons
  const pageButton = [
    <AntButton key="primary-key" label="Thêm mới" />,
    <AntButton key="secondary-key" label="Lưu" />,
  ];

  // Main content
  const pageContent = (
    <Row gutter={[16, 16]} wrap>
      <Col xs={24}>
        <Card hoverable>{"content"}</Card>
      </Col>
    </Row>
  );

  // Render
  return (
    <AntPage
      items={[
        {
          title: "Hệ thống",
        },
        { title: "Tùy chọn" },
      ]}
      title="Danh sách tùy chọn"
      extra={pageButton}
      content={pageContent}
    />
  );
}
