// path: @/app/(front)/app/system/options/page.js

"use client";

import { EditOutlined } from "@ant-design/icons";
import { Row, Col, Card } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  OptionsTable,
  OptionsCreate,
  OptionsEdit,
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
  const { optionColor } = usePageContext();

  // Hooks
  const useOptions = {
    table: useTable(),
    create: useForm(),
    edit: useForm(),
    columns: getOptionsColumn({ optionColor }),
  };

  // Open edit form
  const openOptionsEdit = (record) => {
    const { id } = record || {};
    useOptions.edit.setRequestParams({ id });
    useOptions.edit.setDeleteParams({ id });
    useOptions.edit.open();
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
                    <AntButton
                      icon={<EditOutlined />}
                      color="primary"
                      variant="link"
                      onClick={() => openOptionsEdit(record)}
                    />
                  );
                },
              },
            ]}
          />
          <OptionsCreate
            formHook={useOptions.create}
            columns={useOptions.columns}
            onSubmitSuccess={useOptions.table.reload}
            title="Tạo tùy chọn"
            variant="drawer"
          />
          <OptionsEdit
            formHook={useOptions.edit}
            columns={useOptions.columns}
            requestParams={useOptions.edit.requestParams}
            onSubmitSuccess={useOptions.table.reload}
            deleteParams={useOptions.edit.deleteParams}
            onDeleteSuccess={useOptions.table.reload}
            title="Chỉnh sửa tùy chọn"
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
