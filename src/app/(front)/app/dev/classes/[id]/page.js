// path: @/app/(front)/app/dev/classes/[id]/page.js

"use client";

import { use } from "react";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/components/ui";
import {
  ClassesInfo,
  ClassesEdit,
  getClassesColumn,
} from "@/components/feature";
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
  const { id: classesId } = use(params);

  // Hooks
  const useClasses = {
    info: useInfo(),
    edit: useForm(),
    columns: getClassesColumn(),
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
      onClick={() => useClasses.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <ClassesInfo
        infoHook={useClasses.info}
        requestParams={{ id: classesId }}
        onRequestSuccess={(result) =>
          useClasses.info.setDataSource(result?.data?.[0])
        }
        columns={useClasses.columns}
      />
      <ClassesEdit
        formHook={useClasses.edit}
        columns={useClasses.columns}
        requestParams={{ id: classesId }}
        onSubmitSuccess={useClasses.info.reload}
        onDeleteSuccess={navBack}
        title="Chỉnh sửa lớp học"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useClasses.info?.dataSource?.classStartDate || "Chi tiết";

  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "Lớp học" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
