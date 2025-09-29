import { $fetch } from "../fetch";

export const CaseStageStatus = async (
  service_id: string | undefined,
  payload: {
    case_stage: string | undefined;
    case_sub_stage: string | undefined;
  }
) => {
  try {
    const response = await $fetch.patch(
      `/case-stages/${service_id}/update-stage`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllManageDocsAPI = async (
  service_id: string,
  queryParams: any,
  p0?: { signal: AbortSignal }
) => {
  try {
    const response = await $fetch.get(`/cases/${service_id}/docs`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};

export const caseViewNotesAPI = async (caseId: string, type: any) => {
  try {
    const response = await $fetch.get(`/cases/${caseId}/notes`, type);
    return response;
  } catch (err) {
    throw err;
  }
};

export const caseViewNoteDeleteAPI = async (noteId: number) => {
  try {
    const response = await $fetch.delete(`/notes/${noteId}`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const caseViewAddNoteAPI = async (payload: any) => {
  try {
    const response = await $fetch.post(`/notes`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const caseUpdateNoteAPI = async ({
  noteId,
  payload,
}: {
  noteId: number;
  payload: any;
}) => {
  try {
    const response = await $fetch.patch(`/notes/${noteId}`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getCaseUsersAPI = async (caseId: any) => {
  try {
    const response = await $fetch.get(`/cases/${caseId}/users`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const caseViewNoteAPI = async (noteId: number | null) => {
  try {
    const response = await $fetch.get(`/notes/${noteId}`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getSingleReviewAPI = async (case_id: number) => {
  try {
    const response = await $fetch.get(`/cases/${case_id}/single-review`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const reviewApprovalAPI = async ({ payload }: { payload: any }) => {
  try {
    const response = await $fetch.post(`/reviews/status`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const sendReviewLinkAPI = async (caseId: any, payload: any) => {
  try {
    return await $fetch.post(`/cases/${caseId}/review-email`, payload);
  } catch (err) {
    throw err;
  }
};

export const getCaseReviewStatusAPI = async (caseId: any) => {
  try {
    const response = await $fetch.get(`/cases/${caseId}/review-status`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const addReviewAPI = async (payload: any) => {
  try {
    return await $fetch.post(`/reviews`, payload);
  } catch (err) {
    throw err;
  }
};

export const AddCNRNumberAPI = async (
  case_id: string | undefined,
  payload: {
    cnr_number: string;
    stage: string | undefined;
    sub_stage: string | undefined;
  }
) => {
  try {
    const response = await $fetch.patch(
      `/cases/${case_id}/cnr-number`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const AddCMPNumberAPI = async (
  case_id: string | undefined,
  payload: { cmp_number: string }
) => {
  try {
    const response = await $fetch.patch(
      `/cases/${case_id}/cmp-number`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const addCaseBriefNotesAPI = async (payload: any) => {
  try {
    const response = await $fetch.post(`/notes/case-briefs`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const draftingConsentAPI = async ({
  case_id,
  payload,
}: {
  case_id: string;
  payload: any;
}) => {
  try {
    const response = await $fetch.post(
      `/cases/${case_id}/drafting-signing-consent`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const addSubStage = async (case_id: number, payload: any) => {
  try {
    const response = await $fetch.post(`/case-stages/${case_id}`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteSubStage = async (
  case_id: number,
  sub_stage_code: string
) => {
  try {
    const response = await $fetch.delete(
      `/case-stages/${case_id}/sub-stage/${encodeURIComponent(sub_stage_code)}`
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const editSubStage = async (case_id: number, payload: any) => {
  try {
    const response = await $fetch.patch(`/case-stages/${case_id}`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const reorderSubStage = async (case_id: number, payload: any) => {
  try {
    const response = await $fetch.put(`/case-stages/${case_id}`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getPaymentDetailsAPI = async (case_id: string | undefined) => {
  try {
    const response = await $fetch.get(`/cases/${case_id}/payment`);
    return response;
  } catch (err) {
    throw err;
  }
};



export const addPriceAPI = async (case_id: string|undefined, payload: any) => {
  try {
    const response = await $fetch.patch(`/cases/${case_id}/add-price`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};