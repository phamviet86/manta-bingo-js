// path: @/components/feature/user-roles-component.js

import { AntTable, AntInfo, AntForm } from "@/components/ui";
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
