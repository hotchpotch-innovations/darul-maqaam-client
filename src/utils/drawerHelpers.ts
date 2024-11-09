export const getLastPartOfUrl = (url: string): string => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
};

export const getLastSecondOfUrl = (url: string): string => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 2];
};
