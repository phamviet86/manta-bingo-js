// path: @/app/(front)/app/admin/classes/provider.js

import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "@/app/(front)/provider";
import { buildSelection } from "@/utils/selection-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionsData } = useAppContext();

  const classStatus = buildSelection(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "classes", option_column: "class_status_id" }
  );

  const enrollmentType = buildSelection(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "enrollments", option_column: "enrollment_type_id" }
  );

  const enrollmentPaymentType = buildSelection(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "enrollments", option_column: "enrollment_payment_type_id" }
  );

  const enrollmentStatus = buildSelection(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "enrollments", option_column: "enrollment_status_id" }
  );

  const scheduleStatus = buildSelection(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "schedules", option_column: "schedule_status_id" }
  );

  const contextValue = useMemo(
    () => ({
      classStatus,
      enrollmentStatus,
      enrollmentType,
      enrollmentPaymentType,
      scheduleStatus,
    }),
    [
      classStatus,
      enrollmentStatus,
      enrollmentType,
      enrollmentPaymentType,
      scheduleStatus,
    ]
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

/* 
  const syllabusStatus = buildSelection(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "syllabuses", option_column: "syllabus_status_id" }
  );
  const contextValue = useMemo(() => ({ syllabusStatus }), [syllabusStatus]);
*/

export function usePageContext() {
  return useContext(PageContext);
}
