// path: @/components/feature/options-component.js

import { AntTable } from "@/components/ui";
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
