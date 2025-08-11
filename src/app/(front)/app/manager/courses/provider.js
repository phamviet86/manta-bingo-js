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

  const contextValue = useMemo(() => ({ classStatus }), [classStatus]);

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
