export const extractKeyFromUrl = (url: any) => {
  const match = url.match(/nyaya-tech-b2b\/[^?]+/);
  return match ? match[0] : url;
};

export const addSerial = (dataArray: any, page: any, limit: any) => {
  if (dataArray?.length) {
    let arrayAfterSerial = dataArray.map((item: any, index: number) => {
      return { ...item, serial: (page - 1) * limit + (index + 1) };
    });
    return arrayAfterSerial;
  }
  return [];
};

export const capitalize = (str: string) => {
  return str ? str.replace(/\b\w/g, (char) => char.toUpperCase()) : "";
};

export const generateYears = (from: number, to: number): number[] => {
  const years: number[] = [];
  for (let year = to; year >= from; year--) {
    years.push(year);
  }
  return years;
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};
