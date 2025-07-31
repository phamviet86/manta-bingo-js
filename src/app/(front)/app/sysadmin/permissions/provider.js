// path: @/app/(front)/app/system/permissions/provider.js

import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "@/app/(front)/provider";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const {} = useAppContext();

  const contextValue = useMemo(() => ({}), []);

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
