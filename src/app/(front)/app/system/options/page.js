// path: @/app/(front)/app/system/options/page.js

"use client";

import { Row, Col, Card } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  OptionsTable,
  OptionsCreate,
  getOptionsColumn,
} from "@/components/feature";
import { useTable, useForm } from "@/hooks";
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
          />
          <OptionsCreate
            formHook={useOptions.create}
            columns={useOptions.columns}
            onSubmitSuccess={useOptions.table.reload}
            title="Tạo tùy chọn"
            variant="drawer"
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
