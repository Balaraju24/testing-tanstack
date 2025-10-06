const CASE_SUB_STAGES = {
  DAPT: "CSFG#DAPT",
  DROC: "CSFG#DROC",
  DROP: "CSFG#DROP",
  DRCR: "CSFG#DRCR",
  DRAP: "CSFG#DRAP",
  DFNT: "DLNT#DFNT",
  SNNT: "SLNT#SNNT"
};
const CASE_STAGES = {
  DLNT: "DLNT",
  SLNT: "SLNT"
};
const DRAFT_REVIEW_SUB_STAGES = [
  CASE_SUB_STAGES.DAPT,
  CASE_SUB_STAGES.DROC,
  CASE_SUB_STAGES.DROP,
  CASE_SUB_STAGES.DRCR,
  CASE_SUB_STAGES.DRAP
];
const LEGAL_NOTICE_SUB_STAGES = [
  CASE_SUB_STAGES.DFNT,
  CASE_SUB_STAGES.SNNT
];
const LEGAL_NOTICE_STAGES = [
  CASE_STAGES.DLNT,
  CASE_STAGES.SLNT
];
const QUERY_KEYS = {
  FILE_DETAILS: "file-details",
  DELETE_FILE: "deleteFile",
  DELETE_PLACEHOLDER: "deletePlaceholder",
  APPROVE_REJECT_DOCUMENT: "approve_reject_document"
};
const TOAST_MESSAGES = {
  DELETE_LOADING: "Deleting file...",
  DELETE_SUCCESS: "File deleted successfully",
  DELETE_ERROR: "Failed to delete file",
  CLOSE_LABEL: "\u2715"
};
const STATUS_MESSAGES = {
  PENDING_APPROVAL: "The request has been submitted and is awaiting client approval. We will proceed with the next steps upon their confirmation.",
  USER_APPROVED: "The user has reviewed and approved the request.",
  NO_FILES_COMPLETED: "No files were uploaded for this completed stage.",
  FETCH_ERROR: "Failed to fetch case data",
  API_ERROR: "Failed to fetch documents"
};
const TIMEOUT_DURATION = 1500;

export { DRAFT_REVIEW_SUB_STAGES as D, LEGAL_NOTICE_SUB_STAGES as L, QUERY_KEYS as Q, STATUS_MESSAGES as S, TOAST_MESSAGES as T, LEGAL_NOTICE_STAGES as a, TIMEOUT_DURATION as b };
//# sourceMappingURL=getCaseFilesConstants-BRQFWmkt.mjs.map
