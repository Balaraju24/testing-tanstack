import { $fetch } from "../fetch";

export const getAllAdvocateAPI = async (queryParams: any) => {
  try {
    const response = await $fetch.get("/users", queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};

export const singleAdvocateAPI = async (advocate_id: string | undefined) => {
  try {
    const response = await $fetch.get(`/users/${advocate_id}`);
    return response;
  } catch (err) {
    throw err;
  }
};
export const singleManagerAPI = async (manager_id: string | undefined) => {
  try {
    const response = await $fetch.get(`/users/${manager_id}`);
    return response;
  } catch (err) {
    throw err;
  }
};
 export const getAdvocateWiseCaseTrendsAPI = async (
  advocate_id: string | undefined,
  queryParams: any
) => {
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
export const getManagerWiseCaseTrendsAPI = async (
  manager_id: string | undefined,
  queryParams: any
) => {
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

export const addAdvocateAPI = async (payload: any) => {
  try {
    const response = await $fetch.post(`/users/create-advocate`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
export const addManagerAPI = async (payload: any) => {
  try {
    const response = await $fetch.post(`/users/create-manager`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};


export const updateAdvocateAPI = async ({
  payload,
  advocate_id,
}: {
  payload: any;
  advocate_id: string | undefined;
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
export const updateManagerAPI = async ({
  payload,
  manager_id,
}: {
  payload: any;
  manager_id: string | undefined;
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

export const getAllCombinedCasesAPI = async (queryParams: any) => {
  try {
    const response = await $fetch.get(`/cases/combined-cases`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};