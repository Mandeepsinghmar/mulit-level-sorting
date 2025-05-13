// src/hooks/use-local-storage.ts
import { useState, useEffect, useCallback } from 'react';

function getStoredValue<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') {
    return initialValue; // For SSR
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(`Error reading localStorage key “${key}”:`, error);
    return initialValue;
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Initialize state with initialValue. This is what SSR will use,
  // and also what the client uses for its very first render pass.
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // This useEffect runs only on the client, after the component has mounted.
  useEffect(() => {
    const valueFromStorage = getStoredValue(key, initialValue);
    // Update the state if the value from localStorage is different from the current `storedValue`
    // (which would be `initialValue` on the first run after mount).
    // useState is smart enough not to cause a re-render if the value is identical.
    setStoredValue(valueFromStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]); // Rerun only if the key changes (which is rare for this hook's typical use)

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
