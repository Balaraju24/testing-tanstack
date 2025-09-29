export const addSerial = (
  records: any[],
  current_page: number,
  page_size: number
): any[] => {
  return records.map((record, index) => ({
    ...record,
    serial: (current_page - 1) * page_size + index + 1,
  }));
};
