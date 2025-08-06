"use client";

import { use } from "react";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/components/ui";
import {
  EnrollmentsInfo,
  EnrollmentsEdit,
  enrollmentsSchema,
  enrollmentsMapping,
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
  const { id: enrollmentsId } = use(params);

  // Hooks
  const useEnrollments = {
    info: useInfo(),
    edit: useForm(),
    columns: enrollmentsSchema({}, enrollmentsMapping.classPage),
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
      onClick={() => useEnrollments.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <EnrollmentsInfo
        infoHook={useEnrollments.info}
        requestParams={{ id: enrollmentsId }}
        onRequestSuccess={(result) =>
          useEnrollments.info.setDataSource(result?.data?.[0])
        }
        columns={useEnrollments.columns}
      />
      <EnrollmentsEdit
        formHook={useEnrollments.edit}
        columns={useEnrollments.columns}
        requestParams={{ id: enrollmentsId }}
        onSubmitSuccess={useEnrollments.info.reload}
        onDeleteSuccess={navBack}
        title="Chỉnh sửa đăng ký"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useEnrollments.info?.dataSource?.user_id || "Chi tiết";

  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "Đăng ký" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
