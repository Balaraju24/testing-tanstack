import { $fetch } from "../fetch";
export const getAllNotificationsAPI = async (queryParams: {
  page: Number;
  page_size: Number;
}) => {
  try {
    const response = await $fetch.get("/notifications", queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllNotificationsCountsAPI = async () => {
  try {
    return await $fetch.get(`/notifications/unread-count`);
  } catch (err: any) {
    throw err;
  }
};

export const markAsReadAPI = async (markId: Number) => {
  try {
    return await $fetch.patch(`/notifications/${markId}/mark-as-read`);
  } catch (err) {
    throw err;
  }
};

export const markAsReadAllAPI = async () => {
  try {
    return await $fetch.put(`/notifications/mark-as-read/all`);
  } catch (err) {
    throw err;
  }
};

export const getAllTodoAPI = async (queryParams: any) => {
  try {
    const response = await $fetch.get("/cases/tasks", queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllTodoCountsAPI = async (queryParams: any) => {
  try {
    return await $fetch.get(`/cases/tasks/pending-count`, queryParams);
  } catch (err: any) {
    throw err;
  }
};

export const todoMarkAsReadAPI = async (todoId: any) => {
  try {
    return await $fetch.patch(`/cases/tasks/${todoId}/mark-as-read`);
  } catch (err) {
    throw err;
  }
};
