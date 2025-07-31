// path: @/components/feature/role-permissions-component.js

import { AntTable, AntInfo, AntForm } from "@/components/ui";
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
