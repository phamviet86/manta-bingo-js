// path: @/ component/hook/useLocalStorage.js

"use client";

import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  // Thêm tiền tố bingo- vào trước key để dễ quản lý
  const prefixedKey = `bingo-${key}`;

  // State để lưu giá trị
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(prefixedKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${prefixedKey}":`, error);
      return initialValue;
    }
  });

  // Hàm để set giá trị
  const setValue = (value) => {
    try {
      // Cho phép value là function như useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(prefixedKey, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${prefixedKey}":`, error);
    }
  };

  // Hàm để xóa giá trị
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(prefixedKey);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${prefixedKey}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
}
