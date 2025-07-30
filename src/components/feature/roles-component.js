// path: @/components/feature/roles-component.js

import { AntTable, AntInfo, AntForm } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function RolesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/roles", params, sort, filter)
      }
    />
  );
}

export function RolesInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/roles/${params?.id}`)}
    />
  );
}

export function RolesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/roles", values)}
    />
  );
}

export function RolesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/roles/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/roles/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/roles/${params?.id}`)}
    />
  );
}
