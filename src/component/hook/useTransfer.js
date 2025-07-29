// path: @/component/hook/useTransfer.js

import { useState, useRef } from "react";

export function useTransfer() {
  // Refs
  const reloadRef = useRef();

  // State
  const [sourceParams, setSourceParams] = useState({});
  const [targetParams, setTargetParams] = useState({});
  const [visible, setVisible] = useState(false);

  // Actions
  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setSourceParams({});
    setTargetParams({});
  };

  const reload = () => {
    reloadRef?.current?.();
  };

  // Expose API
  return {
    reloadRef,
    sourceParams,
    setSourceParams,
    targetParams,
    setTargetParams,
    visible,
    open,
    close,
    reload,
  };
}
