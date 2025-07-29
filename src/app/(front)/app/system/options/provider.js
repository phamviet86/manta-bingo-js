// OPTIONS PROVIDER

import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "../../provider";
import { convertSelection } from "@/lib/util/convert-util";
import { COLOR_ENUM } from "@/component/config";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const {} = useAppContext();
  // See the sample below for how to use the context

  const { optionColor } = COLOR_ENUM;

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ optionColor }), [optionColor]);

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}

/* 
  Sample:
  const { optionData } = useAppContext();

  // Convert option data to a selection format
  const enrollmentType = convertSelection(
    optionData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "enrollments", option_column: "enrollment_type_id" }
  );

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      enrollmentType,
    }),
    [enrollmentType]
  );
 */
