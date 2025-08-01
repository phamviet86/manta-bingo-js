// path: @/components/feature/shifts-component.js

import { AntTable, AntInfo, AntForm } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function ShiftsTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/shifts", params, sort, filter)
      }
    />
  );
}

export function ShiftsInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/shifts/${params?.id}`)}
    />
  );
}

export function ShiftsCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/shifts", values)}
    />
  );
}

export function ShiftsEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/shifts/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/shifts/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/shifts/${params?.id}`)}
    />
  );
}
