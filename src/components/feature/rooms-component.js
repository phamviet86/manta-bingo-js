// path: @/components/feature/rooms-component.js

import { AntTable, AntInfo, AntForm } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function RoomsTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/rooms", params, sort, filter)
      }
    />
  );
}

export function RoomsInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/rooms/${params?.id}`)}
    />
  );
}

export function RoomsCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/rooms", values)}
    />
  );
}

export function RoomsEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/rooms/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/rooms/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/rooms/${params?.id}`)}
    />
  );
}
