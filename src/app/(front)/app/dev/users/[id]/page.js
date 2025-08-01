"use client";

import { use } from "react";
import { Row, Col, Card } from "antd";
import { AntPage, AntButton, DiceBeerImage } from "@/components/ui";
import {
  UsersInfo,
  UsersEdit,
  getUsersColumn,
  UsersResetPassword,
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
  const { userStatus } = usePageContext();
  const { navBack } = useNavigate();
  const { id: userId } = use(params);

  // Hooks
  const useUsers = {
    info: useInfo(),
    edit: useForm(),
    columns: getUsersColumn({ userStatus }),
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
      onClick={() => useUsers.edit.open()}
    />,
  ];

  const cardActions = [
    <UsersResetPassword key="reset-password" userId={userId} />,
  ];
  // Main content
  const pageContent = (
    <Row gutter={[16, 16]} wrap="false">
      <Col xs={24} sm={24} md={24} lg={6} xl={4}>
        <Card hoverable style={{ textAlign: "center" }}>
          <DiceBeerImage
            src={useUsers.info?.dataSource?.user_avatar}
            seed={userId}
            style={{ maxWidth: "240px", maxHeight: "240px" }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={24} lg={18} xl={20}>
        <Card hoverable actions={cardActions}>
          <UsersInfo
            infoHook={useUsers.info}
            requestParams={{ id: userId }}
            onRequestSuccess={(result) =>
              useUsers.info.setDataSource(result?.data?.[0])
            }
            columns={useUsers.columns}
            column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
          />
          <UsersEdit
            formHook={useUsers.edit}
            columns={useUsers.columns}
            requestParams={{ id: userId }}
            onSubmitSuccess={useUsers.info.reload}
            onDeleteSuccess={navBack}
            title="Chỉnh sửa người dùng"
            variant="drawer"
          />
        </Card>
      </Col>
    </Row>
  );

  // Page title
  const pageTitle = useUsers.info?.dataSource?.user_name || "Chi tiết";

  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "người dùng" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
