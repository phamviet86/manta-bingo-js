// path: @/components/feature/user-roles-component.js

import { Space, Typography } from "antd";
import { AntTable, AntInfo, AntForm, AntTransfer } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function UserRolesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/user-roles", params, sort, filter)
      }
    />
  );
}

export function UserRolesInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/user-roles/${params?.id}`)}
    />
  );
}

export function UserRolesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/user-roles", values)}
    />
  );
}

export function UserRolesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/user-roles/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/user-roles/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/user-roles/${params?.id}`)}
    />
  );
}

export function UserRolesTransferByUser({ userId, ...props }) {
  return (
    <AntTransfer
      {...props}
      onSourceRequest={(params) => fetchList(`/api/roles`, params)}
      onTargetRequest={(params) => fetchList(`/api/user-roles`, params)}
      targetParams={{ user_id: userId }}
      onAddItem={(keys) =>
        fetchPost(`/api/users/${userId}/user-roles`, {
          roleIds: keys,
        })
      }
      onRemoveItem={(keys) =>
        fetchDelete(`/api/users/${userId}/user-roles`, {
          roleIds: keys,
        })
      }
      sourceItem={{ key: "id" }}
      targetItem={{ key: "role_id" }}
      render={(record) => (
        <Space>
          <Typography.Text>{record?.role_name}</Typography.Text>
          <Typography.Text type="secondary">
            ({record?.role_path})
          </Typography.Text>
        </Space>
      )}
      titles={["Vai trò", "Đã gán"]}
      operations={["Gán vai trò", "Gỡ vai trò"]}
      showSearch={false}
      locale={{
        itemsUnit: "vai trò",
        itemUnit: "vai trò",
        notFoundContent: "Không tìm thấy vai trò",
      }}
    />
  );
}
