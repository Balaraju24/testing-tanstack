import { $ as $fetch } from "./fetch-Cpm1bFFM.js";
const createLegalOpinionAPI = async (payload) => {
  try {
    const response = await $fetch.post(`/cases/legal-opinion`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const createManagerLegalOpinionAPI = async (payload) => {
  try {
    const response = await $fetch.post(
      `/cases/legal-opinion-manager-login`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const getOrganizationDataAPI = async () => {
  try {
    const response = await $fetch.get(`/users/organization-drop-down`);
    return response;
  } catch (err) {
    throw err;
  }
};
const getOrganizationListAPI = async (payload) => {
  try {
    const response = await $fetch.get("/users/organisation-list", payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const fileUploadStageAPI = async (payload) => {
  try {
    const response = await $fetch.post(`/docs/upload-based-type`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const updateUploadStageAPI = async (payload) => {
  try {
    const response = await $fetch.put(`/docs/update-based-type`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const raiseQueryAPI = async (payload) => {
  try {
    const response = await $fetch.post(`/docs/lod/request`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const updateDueDateAPI = async (case_id, payload) => {
  try {
    const response = await $fetch.patch(`/cases/${case_id}/due-date`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const UpdateCategoryAPI = async (doc_id, payload) => {
  try {
    const response = await $fetch.patch(`/docs/${doc_id}/category`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const vettingDocumentsAPI = async (case_id, payload) => {
  try {
    const response = await $fetch.patch(
      `/cases/${case_id}/vetting-docs 
`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const receivedDocumentsAPI = async (case_id, payload) => {
  try {
    const response = await $fetch.patch(
      `/cases/${case_id}/received-original-docs
`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
export {
  UpdateCategoryAPI as U,
  getOrganizationDataAPI as a,
  createManagerLegalOpinionAPI as b,
  createLegalOpinionAPI as c,
  updateDueDateAPI as d,
  raiseQueryAPI as e,
  fileUploadStageAPI as f,
  getOrganizationListAPI as g,
  receivedDocumentsAPI as r,
  updateUploadStageAPI as u,
  vettingDocumentsAPI as v
};
