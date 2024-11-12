export const customTimeOut = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
