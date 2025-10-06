import { $ as $fetch } from './fetch-Cpm1bFFM.mjs';

const CaseStageStatus = async (service_id, payload) => {
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
const getAllManageDocsAPI = async (service_id, queryParams, p0) => {
  try {
    const response = await $fetch.get(`/cases/${service_id}/docs`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
const caseViewNotesAPI = async (caseId, type) => {
  try {
    const response = await $fetch.get(`/cases/${caseId}/notes`, type);
    return response;
  } catch (err) {
    throw err;
  }
};
const caseViewNoteDeleteAPI = async (noteId) => {
  try {
    const response = await $fetch.delete(`/notes/${noteId}`);
    return response;
  } catch (err) {
    throw err;
  }
};
const caseViewAddNoteAPI = async (payload) => {
  try {
    const response = await $fetch.post(`/notes`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const caseUpdateNoteAPI = async ({
  noteId,
  payload
}) => {
  try {
    const response = await $fetch.patch(`/notes/${noteId}`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const caseViewNoteAPI = async (noteId) => {
  try {
    const response = await $fetch.get(`/notes/${noteId}`);
    return response;
  } catch (err) {
    throw err;
  }
};
const getSingleReviewAPI = async (case_id) => {
  try {
    const response = await $fetch.get(`/cases/${case_id}/single-review`);
    return response;
  } catch (err) {
    throw err;
  }
};
const sendReviewLinkAPI = async (caseId, payload) => {
  try {
    return await $fetch.post(`/cases/${caseId}/review-email`, payload);
  } catch (err) {
    throw err;
  }
};
const getCaseReviewStatusAPI = async (caseId) => {
  try {
    const response = await $fetch.get(`/cases/${caseId}/review-status`);
    return response;
  } catch (err) {
    throw err;
  }
};
const addReviewAPI = async (payload) => {
  try {
    return await $fetch.post(`/reviews`, payload);
  } catch (err) {
    throw err;
  }
};
const AddCNRNumberAPI = async (case_id, payload) => {
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
const AddCMPNumberAPI = async (case_id, payload) => {
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
const addCaseBriefNotesAPI = async (payload) => {
  try {
    const response = await $fetch.post(`/notes/case-briefs`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const draftingConsentAPI = async ({
  case_id,
  payload
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
const addSubStage = async (case_id, payload) => {
  try {
    const response = await $fetch.post(`/case-stages/${case_id}`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const deleteSubStage = async (case_id, sub_stage_code) => {
  try {
    const response = await $fetch.delete(
      `/case-stages/${case_id}/sub-stage/${encodeURIComponent(sub_stage_code)}`
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const editSubStage = async (case_id, payload) => {
  try {
    const response = await $fetch.patch(`/case-stages/${case_id}`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const reorderSubStage = async (case_id, payload) => {
  try {
    const response = await $fetch.put(`/case-stages/${case_id}`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const getPaymentDetailsAPI = async (case_id) => {
  try {
    const response = await $fetch.get(`/cases/${case_id}/payment`);
    return response;
  } catch (err) {
    throw err;
  }
};
const addPriceAPI = async (case_id, payload) => {
  try {
    const response = await $fetch.patch(`/cases/${case_id}/add-price`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export { AddCMPNumberAPI as A, CaseStageStatus as C, addReviewAPI as a, addSubStage as b, caseViewNotesAPI as c, deleteSubStage as d, editSubStage as e, getAllManageDocsAPI as f, getSingleReviewAPI as g, caseViewAddNoteAPI as h, caseViewNoteDeleteAPI as i, caseUpdateNoteAPI as j, caseViewNoteAPI as k, addCaseBriefNotesAPI as l, draftingConsentAPI as m, getCaseReviewStatusAPI as n, getPaymentDetailsAPI as o, addPriceAPI as p, AddCNRNumberAPI as q, reorderSubStage as r, sendReviewLinkAPI as s };
//# sourceMappingURL=manage-tW0NLyej.mjs.map
