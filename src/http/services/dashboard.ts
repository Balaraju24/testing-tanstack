import { $fetch } from "../fetch";

export const getCasesCountAPI = async () => {
  try {
    const response = await $fetch.get(`/dash-board/cases-count`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getNextHearingDateAPI = async (queryParams: any) => {
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
export const getServiceTypeStatsCountAPI = async (queryParams: any) => {
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

export const getLocationStatsCountAPI = async (queryParams?: any) => {
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

export const getOrganizationsCountAPI = async (queryParams?: any) => {
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

export const getAdvocatesCountAPI = async (queryParams?: any) => {
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

export const getManagersCountAPI = async (queryParams?: any) => {
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

export const getServicesCountApi = async (queryParams?: any) => {
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

export const getAdvocateServicesCountAPI = async (
  advocate_id: number,
  queryParams?: any
) => {
  try {
    const response = await $fetch.get(
      `/dash-board/services-count/${advocate_id}/advocates`
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const getOrgServiceCasesCount = async (queryParams?: any) => {
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

export const getAllLocations = async (queryParams?: any) => {
  try {
    const response = await $fetch.get(`/locations/list`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getOrganizationAnalytics = async (
  org_id: number,
  queryParams?: any
) => {
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

export const getDueDateAPI = async (queryParams?: any) => {
  try {
    const response = await $fetch.get(`/dash-board/due-date`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};

export const OrgsStatsAPI = async (queryParams?: any) => {
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

export const orgsDropdown = async (queryParams?: any) => {
  try {
    const response = await $fetch.get(`/users/organisation-list`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};

export const advOrgDropDown = async (queryParams?: any) => {
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

export const advLocDropdown = async (queryParams?: any) => {
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
