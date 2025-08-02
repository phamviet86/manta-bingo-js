// path: @/components/feature/syllabuses-component.js

import { AntTable, AntInfo, AntForm } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function SyllabusesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/syllabuses", params, sort, filter)
      }
    />
  );
}

export function SyllabusesInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/syllabuses/${params?.id}`)}
    />
  );
}

export function SyllabusesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/syllabuses", values)}
    />
  );
}

export function SyllabusesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/syllabuses/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/syllabuses/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/syllabuses/${params?.id}`)}
    />
  );
}
