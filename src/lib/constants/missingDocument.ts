// constants.ts
export const FILE_TYPE_ICONS = {
  IMAGE_TYPES: [
    "image",
    "jpg",
    "jpeg",
    "image/jpeg",
    "image/png",
    "gif",
    "svg",
    "png",
    "webp",
    "image/webp",
    "image/jpg"
  ],
  PDF_TYPES: ["application/pdf", "pdf"],
  AUDIO_TYPES: ["audio"],
  DOCUMENT_TYPES: ["document", "docx", "doc", "application/msword"],
  SPREADSHEET_TYPES: ["xlsx", "xls", "csv"],
  TEXT_TYPES: ["text", "txt", "text/plain", "text/csv"]
};

export const VERIFICATION_STATUS = {
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  PENDING: "PENDING"
} as const;

export const STAGE_CODES = {
  QURI_MDSC: "QURI#MDSC",
  REPO: "REPO"
} as const;

export const MESSAGES = {
  NO_MISSING_DOCS_USER: "The advocate has reviewed your case and did not raise any queries. This stage is already completed.",
  NO_MISSING_DOCS_ADVOCATE: "No missing documents were required for this case. This stage is already completed",
  NO_MISSING_DOCS_FOUND: "No missing documents found",
  RAISE_QUERY_MESSAGE: "Raise a query to upload the missing documents",
  NO_FILES_CATEGORY: "No files available for this category.",
  LOADING_MESSAGE: "Loading LOD Files",
  DELETE_CONFIRMATION: "Are you sure want to delete the file",
  SUCCESS_DELETE: "File deleted successfully",
  ERROR_DELETE_DEFAULT: "Failed to delete file"
};

export const UI_CONFIG = {
  FILENAME_SLICE_LENGTH: 11,
  LOADING_TIMEOUT: 2000,
  GRID_CLASSES: "grid xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-4 gap-1 cursor-pointer"
};