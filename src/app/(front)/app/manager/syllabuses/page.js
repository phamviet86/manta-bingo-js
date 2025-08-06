"use client";

import { InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, SubPathButton } from "@/components/ui";
import {
  SyllabusesTable,
  SyllabusesCreate,
  syllabusesSchema,
  syllabusesMapping,
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
  const { syllabusStatus } = usePageContext();
  const { navDetail } = useNavigate();

  // Hooks
  const useSyllabuses = {
    table: useTable(),
    create: useForm(),
    columns: syllabusesSchema({ syllabusStatus }, syllabusesMapping.columns),
    fields: syllabusesSchema({ syllabusStatus }, syllabusesMapping.fields),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useSyllabuses.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useSyllabuses.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <SyllabusesTable
        tableHook={useSyllabuses.table}
        columns={useSyllabuses.columns}
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
      <SyllabusesCreate
        formHook={useSyllabuses.create}
        fields={useSyllabuses.fields}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo giáo trình"
        variant="drawer"
      />
    </ProCard>
  );

  // Render
  return (
    <AntPage
      items={[{ title: "Quản lý" }, { title: "Giáo trình" }]}
      title="Giáo trình"
      extra={pageButton}
      content={pageContent}
    />
  );
}
