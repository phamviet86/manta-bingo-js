import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "@/app/(front)/provider";
import { buildEnum } from "@/utils/build-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionsData } = useAppContext();

  const roomStatus = buildEnum(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "rooms", option_column: "room_status_id" }
  );

  const contextValue = useMemo(() => ({ roomStatus }), [roomStatus]);

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
