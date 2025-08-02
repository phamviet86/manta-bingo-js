// path: @/components/feature/lectures-component.js

import { AntTable, AntInfo, AntForm } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function LecturesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/lectures", params, sort, filter)
      }
    />
  );
}

export function LecturesInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/lectures/${params?.id}`)}
    />
  );
}

export function LecturesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/lectures", values)}
    />
  );
}

export function LecturesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/lectures/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/lectures/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/lectures/${params?.id}`)}
    />
  );
}
