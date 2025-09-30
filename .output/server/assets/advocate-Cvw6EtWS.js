import { $ as $fetch } from "./fetch-Cpm1bFFM.js";
const getAllAdvocateAPI = async (queryParams) => {
  try {
    const response = await $fetch.get("/users", queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
const singleAdvocateAPI = async (advocate_id) => {
  try {
    const response = await $fetch.get(`/users/${advocate_id}`);
    return response;
  } catch (err) {
    throw err;
  }
};
const singleManagerAPI = async (manager_id) => {
  try {
    const response = await $fetch.get(`/users/${manager_id}`);
    return response;
  } catch (err) {
    throw err;
  }
};
const getAdvocateWiseCaseTrendsAPI = async (advocate_id, queryParams) => {
  try {
    const response = await $fetch.get(
      `/dash-board/advocates/${advocate_id}/case-trends`,
      queryParams
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const getManagerWiseCaseTrendsAPI = async (manager_id, queryParams) => {
  try {
    const response = await $fetch.get(
      `/dash-board/manager/${manager_id}/case-trends`,
      queryParams
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const addAdvocateAPI = async (payload) => {
  try {
    const response = await $fetch.post(`/users/create-advocate`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const addManagerAPI = async (payload) => {
  try {
    const response = await $fetch.post(`/users/create-manager`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const updateAdvocateAPI = async ({
  payload,
  advocate_id
}) => {
  try {
    const response = await $fetch.patch(
      `/users/update-advocate/${advocate_id}`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const updateManagerAPI = async ({
  payload,
  manager_id
}) => {
  try {
    const response = await $fetch.patch(
      `/users/update-manager/${manager_id}`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const getAllCombinedCasesAPI = async (queryParams) => {
  try {
    const response = await $fetch.get(`/cases/combined-cases`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
export {
  getAllCombinedCasesAPI as a,
  getManagerWiseCaseTrendsAPI as b,
  getAdvocateWiseCaseTrendsAPI as c,
  singleAdvocateAPI as d,
  addManagerAPI as e,
  addAdvocateAPI as f,
  getAllAdvocateAPI as g,
  updateAdvocateAPI as h,
  singleManagerAPI as s,
  updateManagerAPI as u
};
