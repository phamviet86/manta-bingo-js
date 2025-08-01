import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "@/app/(front)/provider";
import { buildEnum } from "@/utils/build-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionsData } = useAppContext();

  const shiftStatus = buildEnum(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "shifts", option_column: "shift_status_id" }
  );

  const contextValue = useMemo(() => ({ shiftStatus }), [shiftStatus]);

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
