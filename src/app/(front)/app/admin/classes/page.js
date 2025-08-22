// path: @/app/(front)/app/admin/classes/page.js

"use client";

import { InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, SubPathButton } from "@/components/ui";
import {
  ClassesTable,
  classesSchema,
  classesMapping,
} from "@/components/feature";
import { useTable } from "@/hooks";
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

  // Hooks
  const useClasses = {
    table: useTable(),
    columns: classesSchema({ classStatus }, classesMapping.adminColumns),
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
  ];

  // Main content
  const pageContent = (
    <ProCard hoverable bordered>
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
    </ProCard>
  );

  // Render
  return (
    <AntPage
      items={[{ title: "Quản sinh" }, { title: "Lớp học" }]}
      title="Lớp học"
      extra={pageButton}
      content={pageContent}
    />
  );
}
