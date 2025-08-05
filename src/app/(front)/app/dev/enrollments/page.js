"use client";

import { InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, SubPathButton } from "@/components/ui";
import {
  EnrollmentsTable,
  EnrollmentsCreate,
  enrollmentsColumn,
  enrollmentsMapping,
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
  const useEnrollments = {
    table: useTable(),
    create: useForm(),
    columns: enrollmentsColumn({}, enrollmentsMapping.default),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useEnrollments.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useEnrollments.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <EnrollmentsTable
        tableHook={useEnrollments.table}
        columns={useEnrollments.columns}
        rightColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => {
              return (
                <SubPathButton
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
      <EnrollmentsCreate
        formHook={useEnrollments.create}
        columns={useEnrollments.columns}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo đăng ký"
        variant="drawer"
      />
    </ProCard>
  );

  // Render
  return (
    <AntPage
      items={[{ title: "Development" }, { title: "Đăng ký" }]}
      title="Đăng ký"
      extra={pageButton}
      content={pageContent}
    />
  );
}
