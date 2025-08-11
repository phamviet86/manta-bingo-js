// path: @/components/hook/useCalendar.js

import { useRef, useState } from "react";

export function useCalendar() {
  // Refs
  const calendarRef = useRef();

  // State
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Actions
  const reload = () => {
    setLoading(true);
  };

  // Expose API
  return {
    calendarRef,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    loading,
    setLoading,
    reload,
  };
}
