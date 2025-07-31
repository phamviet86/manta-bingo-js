// path: @/component/hook/useTransfer.js

import { useState, useRef } from "react";

export function useTransfer() {
  // Refs
  const transferRef = useRef();

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
    transferRef?.current?.();
  };

  // Expose API
  return {
    transferRef,
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
