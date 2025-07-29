// OPTIONS LIST PAGE

"use client";

import { Space } from "antd";
import { SettingOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, DetailButton } from "@/component/common";
import {
  OptionsTable,
  OptionsCreate,
  OptionsColumns,
  OptionsFields,
} from "@/component/custom";
import { useTable, useForm, useNav } from "@/component/hook";
import { PageProvider, usePageContext } from "./provider";
import { OPTIONS_COLUMN } from "@/component/config";

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
  const { navDetail } = useNav();

  // Option logic hooks
  const useOptions = {
    table: useTable(),
    create: useForm(),
    columns: OptionsColumns({}, OPTIONS_COLUMN),
    fields: OptionsFields(),
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
    <ProCard boxShadow bordered>
      <OptionsTable
        tableHook={useOptions.table}
        columns={useOptions.columns}
        leftColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => (
              <DetailButton
                icon={<InfoCircleOutlined />}
                color="primary"
                variant="link"
                id={record?.id}
              />
            ),
          },
        ]}
      />
      <OptionsCreate
        formHook={useOptions.create}
        fields={useOptions.fields}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo tùy chọn"
        variant="drawer"
      />
    </ProCard>
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
