// path: @/app/(front)/app/system/roles/[id]/page.js

"use client";

import { use } from "react";
import { Row, Col, Card } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import { RolesInfo, RolesEdit, getRolesColumn } from "@/components/feature";
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
  const { id: rolesId } = use(params);

  // Hooks
  const useRoles = {
    info: useInfo(),
    edit: useForm(),
    columns: getRolesColumn(),
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
      onClick={() => useRoles.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <Row gutter={[16, 16]} wrap>
      <Col xs={24}>
        <Card hoverable>
          <RolesInfo
            infoHook={useRoles.info}
            columns={useRoles.columns}
            requestParams={{ id: rolesId }}
            onRequestSuccess={(result) =>
              useRoles.info.setDataSource(result?.data?.[0])
            }
          />
          <RolesEdit
            formHook={useRoles.edit}
            columns={useRoles.columns}
            requestParams={{ id: rolesId }}
            onSubmitSuccess={useRoles.info.reload}
            onDeleteSuccess={navBack}
            title="Chỉnh sửa vai trò"
            variant="drawer"
          />
        </Card>
      </Col>
    </Row>
  );

  // Page title
  const pageTitle = useRoles.info?.dataSource?.role_name || "Chi tiết";

  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "Vai trò" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
