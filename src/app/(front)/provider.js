import { createContext, useContext, useMemo } from "react";
import { useTheme } from "@/component/hook";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { setThemeMode, modeConfig } = useTheme();

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      setThemeMode,
      modeConfig,
    }),
    [setThemeMode, modeConfig]
  );

  // Provide the context to children components
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
