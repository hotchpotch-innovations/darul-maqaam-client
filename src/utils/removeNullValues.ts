export const removeNullValues = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object") {
      // Recursively call the function for nested objects
      removeNullValues(obj[key]);
    }
    // Remove property if value is null
    if (obj[key] === null) {
      delete obj[key];
    }
  });
};
