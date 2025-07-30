// path: @/component/hook/useInfo.js

import { useRef, useState } from "react";

export function useInfo() {
  // Refs
  const infoRef = useRef();

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
    setDataSource({});
    setRequestParams({});
  };

  const reload = () => {
    infoRef?.current?.reload();
  };

  // Expose API
  return {
    infoRef,
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
