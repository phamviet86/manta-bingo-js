import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { fetchList } from "@/utils/fetch-util";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [optionData, setOptionData] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const result = await fetchList("/api/options");

        if (result?.data) {
          setOptionData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    };

    fetchOptions();
  }, []);

  const contextValue = useMemo(() => ({ optionData }), [optionData]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
