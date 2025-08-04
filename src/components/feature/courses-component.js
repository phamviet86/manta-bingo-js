// path: @/components/feature/courses-component.js

import { AntTable, AntInfo, AntForm } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function CoursesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/courses", params, sort, filter)
      }
    />
  );
}

export function CoursesInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/courses/${params?.id}`)}
    />
  );
}

export function CoursesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/courses", values)}
    />
  );
}

export function CoursesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/courses/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/courses/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/courses/${params?.id}`)}
    />
  );
}
