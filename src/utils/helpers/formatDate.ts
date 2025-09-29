import dayjs from "dayjs";

export const formatDate = (value: string | Date, format = "MM-DD-YYYY") => {
  if (!value) return "";
  return dayjs(value).format(format);
};
