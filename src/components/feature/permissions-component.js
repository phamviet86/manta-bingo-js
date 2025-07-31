// path: @/components/feature/permissions-component.js

import { AntTable, AntInfo, AntForm } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function PermissionsTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/permissions", params, sort, filter)
      }
    />
  );
}

export function PermissionsInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/permissions/${params?.id}`)}
    />
  );
}

export function PermissionsCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/permissions", values)}
    />
  );
}

export function PermissionsEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/permissions/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/permissions/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/permissions/${params?.id}`)}
    />
  );
}
