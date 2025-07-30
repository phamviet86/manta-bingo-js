// path: @/app/(front)/app/dev/options/provider.js

import { createContext, useContext, useMemo } from "react";

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
