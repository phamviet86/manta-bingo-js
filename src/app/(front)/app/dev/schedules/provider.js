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

  const contextValue = useMemo(() => ({ scheduleStatus }), [scheduleStatus]);

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
