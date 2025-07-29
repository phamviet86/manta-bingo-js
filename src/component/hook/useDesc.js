// path: @/component/hook/useDesc.js

import { useRef, useState } from "react";

export function useDesc() {
  // Refs
  const descRef = useRef();

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
    descRef?.current?.reload();
  };

  // Expose API
  return {
    descRef,
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
