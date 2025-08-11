import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "@/app/(front)/provider";
import { buildSelection } from "@/utils/selection-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionsData } = useAppContext();

  const syllabusStatus = buildSelection(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "syllabuses", option_column: "syllabus_status_id" }
  );

  const moduleStatus = buildSelection(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "modules", option_column: "module_status_id" }
  );

  const lectureStatus = buildSelection(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "lectures", option_column: "lecture_status_id" }
  );

  const contextValue = useMemo(
    () => ({ syllabusStatus, moduleStatus, lectureStatus }),
    [syllabusStatus, moduleStatus, lectureStatus]
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
