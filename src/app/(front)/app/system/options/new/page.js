// OPTIONS LIST PAGE

"use client";

import { Card, Space } from "antd";
import { SettingOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { AntPage, BackButton } from "@/component/common";
import { OptionsFormCreate, getOptionsColumn } from "@/component/custom";
import { useForm, useNav } from "@/component/hook";
import { PageProvider, usePageContext } from "../provider";

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
  const { navDetail, navBack } = useNav();

  // Option logic hooks
  const useOptions = {
    form: useForm(),
    columns: getOptionsColumn({ optionColor }),
  };

  // Page action buttons
  const pageButton = [
    <BackButton
      key="back-button"
      label="Quay lại"
      color="default"
      variant="outlined"
    />,
  ];

  // Main content
  const pageContent = (
    <Card hoverable variant="outlined">
      <OptionsFormCreate
        columns={useOptions.columns}
        // onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        onSubmitSuccess={navBack}
      />
    </Card>
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
        { title: "Tạo mới" },
      ]}
      title="Tạo tùy chọn mới"
      extra={pageButton}
      content={pageContent}
    />
  );
}
