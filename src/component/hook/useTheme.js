"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { DARK_MODE, LIGHT_MODE } from "@/component/config";

export function useTheme() {
  const [themeMode, setThemeMode] = useLocalStorage("theme-mode", "auto");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to detect system theme preference
  const getSystemTheme = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  // Function to determine if dark mode should be active
  const shouldUseDarkMode = useCallback((mode) => {
    switch (mode) {
      case "dark":
        return true;
      case "light":
        return false;
      case "auto":
        return getSystemTheme();
      default:
        return false;
    }
  }, []);

  // Update dark mode state when theme mode changes or system preference changes
  useEffect(() => {
    const updateTheme = () => {
      const newDarkMode = shouldUseDarkMode(themeMode);
      setIsDarkMode(newDarkMode);
    };

    updateTheme();

    // Listen for system theme changes when in auto mode
    if (themeMode === "auto" && typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        if (themeMode === "auto") {
          setIsDarkMode(e.matches);
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [themeMode, shouldUseDarkMode]);

  // Function to toggle between light and dark mode
  const toggleTheme = () => {
    const newMode = isDarkMode ? "light" : "dark";
    setThemeMode(newMode);
  };

  // Function to set specific theme mode
  const setTheme = (mode) => {
    if (["light", "dark", "auto"].includes(mode)) {
      setThemeMode(mode);
    }
  };

  // Get current theme mode configuration
  const currentMode = isDarkMode ? DARK_MODE : LIGHT_MODE;

  return {
    themeMode,
    setThemeMode,
    modeConfig: currentMode,
  };
}
