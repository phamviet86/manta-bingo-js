"use client";

import { use } from "react";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/components/ui";
import { CoursesInfo, CoursesEdit, coursesColumn } from "@/components/feature";
import { useInfo, useForm, useNavigate } from "@/hooks";
import { PageProvider, usePageContext } from "../provider";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent({ params }) {
  // Context
  const {} = usePageContext();
  const { navBack } = useNavigate();
  const { id: courseId } = use(params);

  // Hooks
  const useCourses = {
    info: useInfo(),
    edit: useForm(),
    columns: coursesColumn(),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="back-button"
      label="Quay lại"
      color="default"
      variant="outlined"
      onClick={navBack}
    />,
    <AntButton
      key="edit-button"
      label="Chỉnh sửa"
      color="primary"
      variant="solid"
      onClick={() => useCourses.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <CoursesInfo
        infoHook={useCourses.info}
        requestParams={{ id: courseId }}
        onRequestSuccess={(result) =>
          useCourses.info.setDataSource(result?.data?.[0])
        }
        columns={useCourses.columns}
      />
      <CoursesEdit
        formHook={useCourses.edit}
        columns={useCourses.columns}
        requestParams={{ id: courseId }}
        onSubmitSuccess={useCourses.info.reload}
        onDeleteSuccess={navBack}
        title="Chỉnh sửa khóa học"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useCourses.info?.dataSource?.course_name || "Chi tiết";

  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "khóa học" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
