// Utility function to filter out undefined, null, or empty values from an object
export const filterUndefinedValues = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  ) as Partial<T>;
};
