// path: @/app/(front)/app/system/options/provider.js

import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "@/app/(front)/provider";
import { COLOR_ENUM } from "@/configs";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const optionColor = COLOR_ENUM;

  const contextValue = useMemo(() => ({ optionColor }), [optionColor]);

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
