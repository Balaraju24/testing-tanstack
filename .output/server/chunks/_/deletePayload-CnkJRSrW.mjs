const deletePayload = (payload, keysToRemove) => {
  Object.keys(payload).forEach((key) => {
    if (keysToRemove.includes(key) && (payload[key] === null || payload[key] === "")) {
      delete payload[key];
    }
  });
  return payload;
};

export { deletePayload as d };
//# sourceMappingURL=deletePayload-CnkJRSrW.mjs.map
