export const deletePayload = (payload: any, keysToRemove: string[]) => {
  Object.keys(payload).forEach((key) => {
    if (
      keysToRemove.includes(key) &&
      (payload[key] === null || payload[key] === "")
    ) {
      delete payload[key];
    }
  });
  return payload;
};
