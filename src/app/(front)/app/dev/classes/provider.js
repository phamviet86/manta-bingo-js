// path: @/app/(front)/app/dev/classes/provider.js

import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "@/app/(front)/provider";
import { buildEnum } from "@/utils/build-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionsData } = useAppContext();

  const classStatus = buildEnum(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "classes", option_column: "class_status_id" }
  );

  const enrollmentType = buildEnum(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "enrollments", option_column: "enrollment_type_id" }
  );

  const enrollmentPaymentType = buildEnum(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "enrollments", option_column: "enrollment_payment_type_id" }
  );

  const enrollmentStatus = buildEnum(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "enrollments", option_column: "enrollment_status_id" }
  );

  const contextValue = useMemo(
    () => ({
      classStatus,
      enrollmentStatus,
      enrollmentType,
      enrollmentPaymentType,
    }),
    [classStatus, enrollmentStatus, enrollmentType, enrollmentPaymentType]
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

/* 
  const syllabusStatus = buildEnum(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "syllabuses", option_column: "syllabus_status_id" }
  );
  const contextValue = useMemo(() => ({ syllabusStatus }), [syllabusStatus]);
*/

export function usePageContext() {
  return useContext(PageContext);
}
