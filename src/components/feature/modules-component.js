// path: @/components/feature/modules-component.js

import { AntTable, AntInfo, AntForm } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function ModulesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/modules", params, sort, filter)
      }
    />
  );
}

export function ModulesInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/modules/${params?.id}`)}
    />
  );
}

export function ModulesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/modules", values)}
    />
  );
}

export function ModulesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/modules/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/modules/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/modules/${params?.id}`)}
    />
  );
}
