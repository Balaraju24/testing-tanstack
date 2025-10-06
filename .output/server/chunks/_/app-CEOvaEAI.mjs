const extractKeyFromUrl = (url) => {
  const match = url.match(/nyaya-tech-b2b\/[^?]+/);
  return match ? match[0] : url;
};
const addSerial = (dataArray, page, limit) => {
  if (dataArray == null ? void 0 : dataArray.length) {
    let arrayAfterSerial = dataArray.map((item, index) => {
      return { ...item, serial: (page - 1) * limit + (index + 1) };
    });
    return arrayAfterSerial;
  }
  return [];
};
const capitalize = (str) => {
  return str ? str.replace(/\b\w/g, (char) => char.toUpperCase()) : "";
};
const generateYears = (from, to) => {
  const years = [];
  for (let year = to; year >= from; year--) {
    years.push(year);
  }
  return years;
};
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export { addSerial as a, getDaysInMonth as b, capitalize as c, extractKeyFromUrl as e, generateYears as g };
//# sourceMappingURL=app-CEOvaEAI.mjs.map
