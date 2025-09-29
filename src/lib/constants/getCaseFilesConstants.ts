// Constants for GetCaseFiles component

export const CASE_SUB_STAGES = {
    DAPT: "CSFG#DAPT",
    DROC: "CSFG#DROC",
    DROP: "CSFG#DROP",
    DRCR: "CSFG#DRCR",
    DRAP: "CSFG#DRAP",
    DREV: "CSFG#DREV",
    DFNT: "DLNT#DFNT",
    NTCE_DFNT: "NTCE#DFNT",
    SNNT: "SLNT#SNNT"
} as const;

export const CASE_STAGES = {
    CSFG: "CSFG",
    DLNT: "DLNT",
    SLNT: "SLNT",
    ONBD: "ONBD",
    NTCE: "NTCE"
} as const;

export const VERIFICATION_STATUS = {
    PENDING: "PENDING",
    REJECTED: "REJECTED",
    APPROVED: "APPROVED"
} as const;

export const STAGE_STATUS = {
    COMPLETED: "completed"
} as const;

// Sub-stages that require approval/document drafting
export const DRAFT_REVIEW_SUB_STAGES = [
    CASE_SUB_STAGES.DAPT,
    CASE_SUB_STAGES.DROC,
    CASE_SUB_STAGES.DROP,
    CASE_SUB_STAGES.DRCR,
    CASE_SUB_STAGES.DRAP
];

// Sub-stages for legal notice flow
export const LEGAL_NOTICE_SUB_STAGES = [
    CASE_SUB_STAGES.DFNT,
    CASE_SUB_STAGES.SNNT
];

export const LEGAL_NOTICE_STAGES = [
    CASE_STAGES.DLNT,
    CASE_STAGES.SLNT
];

// Sub-stages where placeholders should be shown
export const PLACEHOLDER_SUB_STAGES = [
    CASE_SUB_STAGES.DAPT,
    CASE_SUB_STAGES.DROC,
    CASE_SUB_STAGES.DROP,
    CASE_SUB_STAGES.DRCR,
    CASE_SUB_STAGES.DRAP,
    CASE_SUB_STAGES.NTCE_DFNT
];

// Sub-stages that are excluded from normal placeholder logic
export const EXCLUDED_PLACEHOLDER_SUB_STAGES = [
    "ONBD#EKYC",
    CASE_SUB_STAGES.DREV,
    "ONBD#VKAC",
    ...PLACEHOLDER_SUB_STAGES
];

// Sub-stages for legal notice placeholder
export const LEGAL_NOTICE_PLACEHOLDER_SUB_STAGES = [
    CASE_SUB_STAGES.DFNT
];

// Sub-stages that trigger stage completion on approval
export const COMPLETION_TRIGGER_SUB_STAGES = [
    CASE_SUB_STAGES.DRAP,
    CASE_SUB_STAGES.DAPT,
    CASE_SUB_STAGES.DROC,
    CASE_SUB_STAGES.DROP,
    CASE_SUB_STAGES.DRCR
];

export const QUERY_KEYS = {
    FILE_DETAILS: "file-details",
    DELETE_FILE: "deleteFile",
    DELETE_PLACEHOLDER: "deletePlaceholder",
    APPROVE_REJECT_DOCUMENT: "approve_reject_document"
} as const;

export const TOAST_MESSAGES = {
    DELETE_LOADING: "Deleting file...",
    DELETE_SUCCESS: "File deleted successfully",
    DELETE_ERROR: "Failed to delete file",
    CLOSE_LABEL: "✕"
} as const;

export const STATUS_MESSAGES = {
    PENDING_APPROVAL: "The request has been submitted and is awaiting client approval. We will proceed with the next steps upon their confirmation.",
    USER_APPROVED: "The user has reviewed and approved the request.",
    NO_FILES_COMPLETED: "No files were uploaded for this completed stage.",
    FETCH_ERROR: "Failed to fetch case data",
    API_ERROR: "Failed to fetch documents"
} as const;

export const TIMEOUT_DURATION = 1500;