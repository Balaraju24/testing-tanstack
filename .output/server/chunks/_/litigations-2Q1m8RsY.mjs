import { $ as $fetch } from './fetch-Cpm1bFFM.mjs';

const getLitigationAPI = async (queryParams) => {
  try {
    const response = await $fetch.get(`/services`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
const getAllLitigationAPI = async (queryParams) => {
  try {
    const response = await $fetch.get(`/cases/litigation`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
const getAllLegalOpinionAPI = async (queryParams) => {
  try {
    const response = await $fetch.get(`/cases`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
const createLitigationAPI = async (payload) => {
  try {
    const response = await $fetch.post(`/cases/litigation`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const createManagerLitigationAPI = async (payload) => {
  try {
    const response = await $fetch.post(
      `/cases/litigation-manager-login`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const getCaseStagesAPI = async (queryParams) => {
  try {
    const response = await $fetch.get(`/case-stages`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};

export { getAllLegalOpinionAPI as a, getCaseStagesAPI as b, getLitigationAPI as c, createManagerLitigationAPI as d, createLitigationAPI as e, getAllLitigationAPI as g };
//# sourceMappingURL=litigations-2Q1m8RsY.mjs.map
