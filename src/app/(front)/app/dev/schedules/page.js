"use client";

import { InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, SubPathButton } from "@/components/ui";
import {
  SchedulesTable,
  SchedulesCreate,
  schedulesSchema,
  schedulesMapping,
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
  const useSchedules = {
    table: useTable(),
    create: useForm(),
    columns: schedulesSchema({}, schedulesMapping.columns),
    fields: schedulesSchema({}, schedulesMapping.fields),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useSchedules.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useSchedules.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <SchedulesTable
        tableHook={useSchedules.table}
        columns={useSchedules.columns}
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
      <SchedulesCreate
        formHook={useSchedules.create}
        fields={useSchedules.fields}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo Lịch học"
        variant="drawer"
      />
    </ProCard>
  );

  // Render
  return (
    <AntPage
      items={[{ title: "Development" }, { title: "Lịch học" }]}
      title="Lịch học"
      extra={pageButton}
      content={pageContent}
    />
  );
}
