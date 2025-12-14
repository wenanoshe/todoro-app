import { useState, useEffect, useCallback } from "react";

/**
 * Hook for managing state that persists to localStorage
 * @param key - The localStorage key
 * @param initialValue - The initial value if localStorage is empty
 * @returns [storedValue, setValue] - Similar to useState
 */
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Validate that the value can be serialized and fits in storage
        const serialized = JSON.stringify(valueToStore);
        window.localStorage.setItem(key, serialized);

        // Only update state after successful persistence
        setStoredValue(valueToStore);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "QuotaExceededError") {
            console.error(
              `localStorage quota exceeded for key "${key}". Data not persisted.`,
              error
            );
          } else {
            console.error(`Error writing to localStorage (${key}):`, error);
          }
        }
        // Do not update state on write failure
      }
    },
    [key, storedValue]
  );

  // Sync state when localStorage changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.error(
            `Error parsing storage change for key "${key}":`,
            error
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue] as const;
};

export { useLocalStorage };
