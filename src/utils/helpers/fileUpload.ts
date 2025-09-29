import dayjs from "dayjs";

export const formatPhoneNumber = (phone?: string): string => {
  if (!phone) return "";
  return phone.replace(/^(\+91)(\d{5})(\d{5})$/, "$1 $2$3");
};

export const formatDateTime = (dateString?: string): string => {
  if (!dateString) return "";
  return dayjs(dateString).format("hh:mm a on DD MMM YYYY");
};
