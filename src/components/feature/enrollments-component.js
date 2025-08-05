// path: @/components/feature/enrollments-component.js

import { AntTable, AntInfo, AntForm } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function EnrollmentsTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/enrollments", params, sort, filter)
      }
    />
  );
}

export function EnrollmentsInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/enrollments/${params?.id}`)}
    />
  );
}

export function EnrollmentsCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/enrollments", values)}
    />
  );
}

export function EnrollmentsEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/enrollments/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/enrollments/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/enrollments/${params?.id}`)}
    />
  );
}
