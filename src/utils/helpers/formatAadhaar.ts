export const formatAadhaar = (aadhaar: string): string => {
  return aadhaar.replace(/(\d{4})(?=\d)/g, "$1 ");
};
