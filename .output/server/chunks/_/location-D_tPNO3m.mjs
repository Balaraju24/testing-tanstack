import { $ as $fetch } from './fetch-Cpm1bFFM.mjs';

const getAllLocationsAPI = async (queryParams) => {
  try {
    const response = await $fetch.get(`/locations/list`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
const CreateLocationAPI = async (payload) => {
  try {
    const response = await $fetch.post(`/locations`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const getAllLocationsListAPI = async () => {
  try {
    const response = await $fetch.get(`/locations`);
    return response;
  } catch (err) {
    throw err;
  }
};
const deleteLocationAPI = async ({
  locationId
}) => {
  try {
    return await $fetch.delete(`/locations/${locationId}`);
  } catch (err) {
    throw err;
  }
};
const editLocationAPI = async ({
  locationId,
  payload
}) => {
  try {
    const response = await $fetch.patch(`/locations/${locationId}`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const toggleStatusLocationAPI = async ({
  locationId,
  payload
}) => {
  try {
    const response = await $fetch.patch(
      `/locations/${locationId}/location-status`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export { CreateLocationAPI as C, getAllLocationsListAPI as a, deleteLocationAPI as d, editLocationAPI as e, getAllLocationsAPI as g, toggleStatusLocationAPI as t };
//# sourceMappingURL=location-D_tPNO3m.mjs.map
