// path: @/app/(front)/app/dev/classes/page.js

"use client";

import { InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, SubPathButton } from "@/components/ui";
import {
  ClassesTable,
  ClassesCreate,
  classesColumn,
  classesMapping,
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
  const { classStatus } = usePageContext();
  const { navDetail } = useNavigate();

  // Hooks
  const useClasses = {
    table: useTable(),
    create: useForm(),
    columns: classesColumn({ classStatus }, classesMapping.default),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useClasses.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useClasses.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <ClassesTable
        tableHook={useClasses.table}
        columns={useClasses.columns}
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
      <ClassesCreate
        formHook={useClasses.create}
        columns={useClasses.columns}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo lớp học"
        variant="drawer"
      />
    </ProCard>
  );

  // Render
  return (
    <AntPage
      items={[{ title: "Development" }, { title: "Lớp học" }]}
      title="Lớp học"
      extra={pageButton}
      content={pageContent}
    />
  );
}
