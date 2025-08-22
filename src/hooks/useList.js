// path: @/hooks/useTable.js

import { useRef, useState } from "react";

export function useList() {
  // Refs
  const listRef = useRef();

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
    listRef?.current?.reload();
  };

  // Expose API
  return {
    listRef,
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
