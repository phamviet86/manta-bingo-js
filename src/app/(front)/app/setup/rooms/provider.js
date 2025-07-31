import { createContext, useContext, useMemo } from "react";
import { fetchList } from "@/utils/fetch-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const contextValue = useMemo(() => ({}), []);

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
