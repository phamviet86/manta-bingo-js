// path: @/components/feature/schedules-component.js

import { AntTable, AntInfo, AntForm, FullCalendar } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function SchedulesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/schedules", params, sort, filter)
      }
    />
  );
}

export function SchedulesInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/schedules/${params?.id}`)}
    />
  );
}

export function SchedulesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/schedules", values)}
    />
  );
}

export function SchedulesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/schedules/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/schedules/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/schedules/${params?.id}`)}
    />
  );
}

export function SchedulesCalendar(props) {
  return (
    <FullCalendar
      {...props}
      onRequest={(params) => fetchList("/api/schedules", params)}
      // requestItem={{ id: "id", title: "id" }}
    />
  );
}
