// path: @/component/hook/useTable.js

import { useRef, useState } from "react";

export function useTable() {
  // Refs
  const tableRef = useRef();

  // State
  const [dataSource, setDataSource] = useState({});
  const [requestParams, setRequestParams] = useState({});
  const [visible, setVisible] = useState(false);

  // Actions
  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  const reload = () => {
    tableRef?.current?.reload();
  };

  // Expose API
  return {
    tableRef,
    dataSource,
    setDataSource,
    requestParams,
    setRequestParams,
    visible,
    setVisible,
    open,
    close,
    reload,
  };
}
