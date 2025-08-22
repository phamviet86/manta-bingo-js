// path: @/components/feature/attendances-component.js

import { AntTable, AntList, AntInfo, AntForm } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function AttendancesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/attendances", params, sort, filter)
      }
    />
  );
}

export function AttendancesList(props) {
  return (
    <AntList
      {...props}
      onRequest={(params, sort, filter) =>
        // fetchList("/api/attendances", params, sort, filter)
        fetchList("/api/schedules", params, sort, filter)
      }
      itemCardProps={{
        // bordered: false,
        type: "inner",
        ghost: true,
      }}
    />
  );
}

export function AttendancesInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/attendances/${params?.id}`)}
    />
  );
}

export function AttendancesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/attendances", values)}
    />
  );
}

export function AttendancesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/attendances/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/attendances/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/attendances/${params?.id}`)}
    />
  );
}
