import { createContext, useContext, useMemo } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({}), []);

  // Provide the context to children components
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
