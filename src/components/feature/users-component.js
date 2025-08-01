// path: @/components/feature/users-component.js

import { AntTable, AntInfo, AntForm } from "@/components/ui";
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
