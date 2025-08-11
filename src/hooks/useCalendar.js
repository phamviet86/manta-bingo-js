// path: @/components/hook/useCalendar.js

import { useRef, useState } from "react";

export function useCalendar() {
  // Refs
  const calendarRef = useRef();
  const reloadRef = useRef();

  // State
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [visible, setVisible] = useState(false);

  // Actions
  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setRequestParams({});
  };

  const reload = () => {
    reloadRef?.current?.();
  };

  // Expose API
  return {
    calendarRef,
    reloadRef,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    requestParams,
    setRequestParams,
    visible,
    open,
    close,
    reload,
  };
}
