// path: @/components/feature/users-component.js

import { KeyOutlined } from "@ant-design/icons";
import {
  AntTable,
  AntInfo,
  AntForm,
  AntConfirm,
  AntButton,
} from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function UsersTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/users", params, sort, filter)
      }
    />
  );
}

export function UsersInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/users/${params?.id}`)}
    />
  );
}

export function UsersCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/users", values)}
    />
  );
}

export function UsersEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/users/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/users/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/users/${params?.id}`)}
    />
  );
}

export function UsersResetPassword({ userId, ...props }) {
  return (
    <AntConfirm
      onConfirm={() => fetchPut(`/api/users/${userId}/reset-password`)}
      showConfirmMessage={true}
      title="Đặt lại mật khẩu"
      description="Bạn có chắc chắn muốn đặt lại mật khẩu không?"
      icon={<KeyOutlined />}
      okText="Có"
      cancelText="Không"
    >
      <AntButton
        {...props}
        label="Đặt lại mật khẩu"
        icon={<KeyOutlined />}
        color="default"
        variant="link"
        style={{ height: "auto" }}
      />
    </AntConfirm>
  );
}
