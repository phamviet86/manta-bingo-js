import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "@/app/(front)/provider";
import { buildSelection } from "@/utils/selection-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionsData } = useAppContext();

  const scheduleStatus = buildSelection(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "schedules", option_column: "schedule_status_id" }
  );

  const attendanceStatus = buildSelection(
    optionsData,
    {
      value: "id",
      label: "option_label",
      color: "option_color",
    },
    { option_table: "attendances", option_column: "attendance_status_id" }
  );
  const attendanceType = buildSelection(
    optionsData,
    {
      value: "id",
      label: "option_label",
      color: "option_color",
      group: "option_group",
    },
    { option_table: "attendances", option_column: "attendance_type_id" }
  );

  const contextValue = useMemo(
    () => ({ scheduleStatus, attendanceStatus, attendanceType }),
    [scheduleStatus, attendanceStatus, attendanceType]
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

/* 
  const scheduleStatus = buildSelection(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "schedules", option_column: "schedule_status_id" }
  );
  const contextValue = useMemo(() => ({ scheduleStatus }), [scheduleStatus]);
*/

export function usePageContext() {
  return useContext(PageContext);
}
