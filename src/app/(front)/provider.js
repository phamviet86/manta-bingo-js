import { createContext, useContext, useMemo } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const contextValue = useMemo(() => ({}), []);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
