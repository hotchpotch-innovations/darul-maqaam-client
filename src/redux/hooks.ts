import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

import { useEffect, useState } from "react";

interface UseDebouncedProps {
  searchQuery: string;
  delay: number;
}

export const useDebounced = ({
  searchQuery,
  delay,
}: UseDebouncedProps): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return debouncedValue;
};
