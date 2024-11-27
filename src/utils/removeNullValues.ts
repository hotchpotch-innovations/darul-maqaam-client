export const removeNullValues = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object") {
      // Recursively call the function for nested objects
      removeNullValues(obj[key]);
    }
    // Remove property if value is null
    if (obj[key] === null || undefined) {
      delete obj[key];
    }
  });
};

export const removeNullFields = (obj: any) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null)
  );
};

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
