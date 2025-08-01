import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "@/app/(front)/provider";
import { buildEnum } from "@/utils/build-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionsData } = useAppContext();

  const userStatus = buildEnum(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "users", option_column: "user_status_id" }
  );

  const contextValue = useMemo(() => ({ userStatus }), [userStatus]);

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
