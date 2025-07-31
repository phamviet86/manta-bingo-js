// path: @/components/feature/role-permissions-component.js

import { Space, Typography } from "antd";
import { AntTable, AntInfo, AntForm, AntTransfer } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function RolePermissionsTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/role-permissions", params, sort, filter)
      }
    />
  );
}

export function RolePermissionsInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/role-permissions/${params?.id}`)}
    />
  );
}

export function RolePermissionsCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/role-permissions", values)}
    />
  );
}

export function RolePermissionsEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/role-permissions/${params?.id}`)}
      onSubmit={(values) =>
        fetchPut(`/api/role-permissions/${values?.id}`, values)
      }
      onDelete={(params) => fetchDelete(`/api/role-permissions/${params?.id}`)}
    />
  );
}

export function RolePermissionsTransferByRole({ roleId, ...props }) {
  return (
    <AntTransfer
      {...props}
      onSourceRequest={(params) => fetchList(`/api/permissions`, params)}
      onTargetRequest={(params) => fetchList(`/api/role-permissions`, params)}
      onAddItem={(keys) =>
        fetchPost(`/api/roles/${roleId}/role-permissions`, {
          permissionIds: keys,
        })
      }
      onRemoveItem={(keys) =>
        fetchDelete(`/api/roles/${roleId}/role-permissions`, {
          permissionIds: keys,
        })
      }
      sourceItem={{ key: "id" }}
      targetItem={{ key: "permission_id" }}
      render={(record) => (
        <Space>
          <Typography.Text>{record?.permission_key}</Typography.Text>
          <Typography.Text type="secondary">
            ({record?.permission_desc})
          </Typography.Text>
        </Space>
      )}
      titles={["Quyền", "Đã gán"]}
      operations={["Gán quyền", "Xóa quyền"]}
      showSearch={true}
      searchSourceColumns={["permission_key_like", "permission_desc_like"]}
      searchTargetColumns={["permission_key_like", "permission_desc_like"]}
      locale={{
        searchPlaceholder: "Tìm kiếm...",
        itemsUnit: "quyền",
        itemUnit: "quyền",
        notFoundContent: "Không tìm thấy quyền",
      }}
    />
  );
}
