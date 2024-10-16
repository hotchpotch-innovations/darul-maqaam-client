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
