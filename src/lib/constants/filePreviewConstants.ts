// Constants for FilePreviewDialog component
export const SPECIAL_STAGES = [
  "CSFG#DAPT",
  "CSFG#DROP",
  "CSFG#DROC",
  "CSFG#DRCR",
  "CSFG#DRAP",
  "DLNT#DFNT",
  "NTCE#DFNT"
];

export const IMAGE_FILE_TYPES = [
  "image",
  "jpg",
  "jpeg",
  "image/jpeg",
  "image/png",
  "gif",
  "svg",
  "png",
  "webp",
  "image/svg+xml"
];

export const STATUS_CLASSES = {
  REJECTED: "bg-red-500 hover:bg-red-500 text-xs px-4 py-2 text-white rounded-none font-primary cursor-pointer",
  APPROVED: "bg-green-500 hover:bg-green-500 text-xs px-4 py-1 text-white rounded-none font-primary cursor-pointer",
  PENDING: "bg-orange-500 hover:bg-orange-500 text-xs px-4 py-1 text-white rounded-none font-primary cursor-pointer",
  DEFAULT: "bg-black hover:bg-black text-xs px-4 py-1 text-white rounded-none font-primary cursor-pointer"
};

export const VERIFICATION_STATUS = {
  PENDING: "PENDING",
  REJECTED: "REJECTED",
  APPROVED: "APPROVED"
} as const;

export const DIALOG_CONFIG = {
  WIDTH_PERCENTAGE: "90%",
  MAIN_CONTENT_WIDTH: "3/5",
  SIDEBAR_WIDTH: "2/5",
  IMAGE_HEIGHT: "70vh"
};

export const BUTTON_CONFIG = {
  REJECT: {
    variant: "outline" as const,
    className: "text-xs h-7 active:scale-95 duration-300 transition-all px-4 rounded-none cursor-pointer text-red-500",
    text: "Reject"
  },
  APPROVE: {
    className: "bg-green-500 active:scale-95 duration-300 transition-all h-7 text-xs px-4 cursor-pointer text-white rounded-none hover:bg-green-500",
    text: "Approve"
  }
};