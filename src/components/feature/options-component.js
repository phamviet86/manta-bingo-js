// path: @/components/feature/options-component.js

import { AntTable, AntInfo, AntForm } from "@/components/ui";
import { fetchList } from "@/utils/fetch-util";

export function OptionsTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/options", params, sort, filter)
      }
    />
  );
}

export function OptionsDesc(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/options/${params?.id}`)}
    />
  );
}

export function OptionsCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/options", values)}
    />
  );
}

export function OptionsEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/options/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/options/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/options/${params?.id}`)}
    />
  );
}
