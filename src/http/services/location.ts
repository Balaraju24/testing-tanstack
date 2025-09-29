import { $fetch } from "../fetch";
export const getAllLocationsAPI = async (queryParams: any) => {
  try {
    const response = await $fetch.get(`/locations/list`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
export const CreateLocationAPI = async (payload: any) => {
  try {
    const response = await $fetch.post(`/locations`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllLocationsListAPI = async () => {
  try {
    const response = await $fetch.get(`/locations`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteLocationAPI = async ({
  locationId,
}: {
  locationId: number;
}) => {
  try {
    return await $fetch.delete(`/locations/${locationId}`);
  } catch (err) {
    throw err;
  }
};

export const editLocationAPI = async ({
  locationId,
  payload,
}: {
  locationId: number;
  payload: { name: string; id: number };
}) => {
  try {
    const response = await $fetch.patch(`/locations/${locationId}`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const toggleStatusLocationAPI = async ({
  locationId,
  payload,
}: {
  locationId: number;
  payload: { active: boolean };
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
