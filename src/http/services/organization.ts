import { $fetch } from "../fetch";

export const getAllOganizationAPI = async (queryParams: any) => {
  try {
    const response = await $fetch.get("/users", queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};

export const addOrganizationAPI = async (payload: any) => {
  try {
    const response = await $fetch.post(`/users/register-organisation`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateOrganizationAPI = async (
  organization_id: string | undefined,
  payload: any
) => {
  try {
    const response = await $fetch.patch(
      `/users/update-organisation/${organization_id}`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
