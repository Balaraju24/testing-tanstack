import { $ as $fetch } from "./fetch-Cpm1bFFM.js";
const getCasesCountAPI = async () => {
  try {
    const response = await $fetch.get(`/dash-board/cases-count`);
    return response;
  } catch (err) {
    throw err;
  }
};
const getNextHearingDateAPI = async (queryParams) => {
  try {
    const response = await $fetch.get(
      `/dash-board/next-hearing-date`,
      queryParams
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const getServiceTypeStatsCountAPI = async (queryParams) => {
  try {
    const response = await $fetch.get(
      `/dash-board/services-type-counts`,
      queryParams
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const getLocationStatsCountAPI = async (queryParams) => {
  try {
    const response = await $fetch.get(
      `/dash-board/locations-count`,
      queryParams
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const getOrganizationsCountAPI = async (queryParams) => {
  try {
    const response = await $fetch.get(
      `/dash-board/organizations-count`,
      queryParams
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const getAdvocatesCountAPI = async (queryParams) => {
  try {
    const response = await $fetch.get(
      `/dash-board/advocates-count`,
      queryParams
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const getManagersCountAPI = async (queryParams) => {
  try {
    const response = await $fetch.get(
      `/dash-board/managers-count`,
      queryParams
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const getServicesCountApi = async (queryParams) => {
  try {
    const response = await $fetch.get(
      `/dash-board/services-count`,
      queryParams
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const getAdvocateServicesCountAPI = async (advocate_id, queryParams) => {
  try {
    const response = await $fetch.get(
      `/dash-board/services-count/${advocate_id}/advocates`
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const getOrgServiceCasesCount = async (queryParams) => {
  try {
    const response = await $fetch.get(
      `/dash-board/services/status-wise`,
      queryParams
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const getAllLocations = async (queryParams) => {
  try {
    const response = await $fetch.get(`/locations/list`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
const getOrganizationAnalytics = async (org_id, queryParams) => {
  try {
    const response = await $fetch.get(
      `/dash-board/organizations/${org_id}/stats`,
      queryParams
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const getDueDateAPI = async (queryParams) => {
  try {
    const response = await $fetch.get(`/dash-board/due-date`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
const OrgsStatsAPI = async (queryParams) => {
  try {
    const response = await $fetch.get(
      `/dash-board/organization-stats`,
      queryParams
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const orgsDropdown = async (queryParams) => {
  try {
    const response = await $fetch.get(`/users/organisation-list`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
const advOrgDropDown = async (queryParams) => {
  try {
    const response = await $fetch.get(
      `/users/organisation-list/advocate`,
      queryParams
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const advLocDropdown = async (queryParams) => {
  try {
    const response = await $fetch.get(
      `/users/location-list/advocate`,
      queryParams
    );
    return response;
  } catch (err) {
    throw err;
  }
};
export {
  OrgsStatsAPI as O,
  getNextHearingDateAPI as a,
  getDueDateAPI as b,
  getOrganizationAnalytics as c,
  getCasesCountAPI as d,
  getLocationStatsCountAPI as e,
  getServicesCountApi as f,
  getOrgServiceCasesCount as g,
  getAdvocateServicesCountAPI as h,
  getOrganizationsCountAPI as i,
  getAdvocatesCountAPI as j,
  getManagersCountAPI as k,
  getAllLocations as l,
  advOrgDropDown as m,
  advLocDropdown as n,
  orgsDropdown as o,
  getServiceTypeStatsCountAPI as p
};
