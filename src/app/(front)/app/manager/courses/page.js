"use client";

import { InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, SubPathButton } from "@/components/ui";
import {
  CoursesTable,
  CoursesCreate,
  coursesSchema,
  coursesMapping,
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
  const useCourses = {
    table: useTable(),
    create: useForm(),
    columns: coursesSchema({}, coursesMapping.columns),
    fields: coursesSchema({}, coursesMapping.fields),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useCourses.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useCourses.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard hoverable bordered>
      <CoursesTable
        tableHook={useCourses.table}
        columns={useCourses.columns}
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
      <CoursesCreate
        formHook={useCourses.create}
        fields={useCourses.fields}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo khóa học"
        variant="drawer"
      />
    </ProCard>
  );

  // Render
  return (
    <AntPage
      items={[{ title: "Quản lý" }, { title: "Khóa học" }]}
      title="Khóa học"
      extra={pageButton}
      content={pageContent}
    />
  );
}
