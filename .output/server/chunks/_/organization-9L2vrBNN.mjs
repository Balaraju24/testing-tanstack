import { $ as $fetch } from './fetch-Cpm1bFFM.mjs';

const getAllOganizationAPI = async (queryParams) => {
  try {
    const response = await $fetch.get("/users", queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
const addOrganizationAPI = async (payload) => {
  try {
    const response = await $fetch.post(`/users/register-organisation`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const updateOrganizationAPI = async (organization_id, payload) => {
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

export { addOrganizationAPI as a, getAllOganizationAPI as g, updateOrganizationAPI as u };
//# sourceMappingURL=organization-9L2vrBNN.mjs.map
