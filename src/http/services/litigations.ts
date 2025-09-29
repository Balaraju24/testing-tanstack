import { $fetch } from "../fetch";

export const getLitigationAPI = async (queryParams: { category: string }) => {
  try {
    const response = await $fetch.get(`/services`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
export const getAllLitigationAPI = async (queryParams: any) => {
  try {
    const response = await $fetch.get(`/cases/litigation`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
export const getAllLegalOpinionAPI = async (queryParams: any) => {
  try {
    const response = await $fetch.get(`/cases`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
export const createLitigationAPI = async (payload: {
  service_id: number;
  pro_code: string;
  case_type_acrym: string;
}) => {
  try {
    const response = await $fetch.post(`/cases/litigation`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const createManagerLitigationAPI = async (payload: {
  service_id: number;
  pro_code: string;
  case_type_acrym: string;
  location_id: number;
  organisation_name: string;
  user_id: number;
}) => {
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

export const getCaseStagesAPI = async (queryParams: {
  case_id: string | undefined;
}) => {
  try {
    const response = await $fetch.get(`/case-stages`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getLitigationByCity = async (queryParams: any) => {
  try {
    const response = await $fetch.get(`/cases/litigation/city`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
