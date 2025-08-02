"use client";

import { use } from "react";
import { Row, Col, Card } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  SyllabusesInfo,
  SyllabusesEdit,
  getSyllabusesColumn,
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
  const { id: syllabusId } = use(params);

  // Hooks
  const useSyllabuses = {
    info: useInfo(),
    edit: useForm(),
    columns: getSyllabusesColumn(),
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
      onClick={() => useSyllabuses.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <Row gutter={[16, 16]} wrap>
      <Col xs={24}>
        <Card hoverable>
          <SyllabusesInfo
            infoHook={useSyllabuses.info}
            requestParams={{ id: syllabusId }}
            onRequestSuccess={(result) =>
              useSyllabuses.info.setDataSource(result?.data?.[0])
            }
            columns={useSyllabuses.columns}
          />
          <SyllabusesEdit
            formHook={useSyllabuses.edit}
            columns={useSyllabuses.columns}
            requestParams={{ id: syllabusId }}
            onSubmitSuccess={useSyllabuses.info.reload}
            onDeleteSuccess={navBack}
            title="Chỉnh sửa giáo trình"
            variant="drawer"
          />
        </Card>
      </Col>
    </Row>
  );

  // Page title
  const pageTitle = useSyllabuses.info?.dataSource?.syllabus_name || "Chi tiết";

  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "Giáo trình" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
