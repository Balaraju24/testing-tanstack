import { $ as $fetch } from "./fetch-Cpm1bFFM.js";
const getAllNotificationsAPI = async (queryParams) => {
  try {
    const response = await $fetch.get("/notifications", queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
const getAllNotificationsCountsAPI = async () => {
  try {
    return await $fetch.get(`/notifications/unread-count`);
  } catch (err) {
    throw err;
  }
};
const markAsReadAPI = async (markId) => {
  try {
    return await $fetch.patch(`/notifications/${markId}/mark-as-read`);
  } catch (err) {
    throw err;
  }
};
const markAsReadAllAPI = async () => {
  try {
    return await $fetch.put(`/notifications/mark-as-read/all`);
  } catch (err) {
    throw err;
  }
};
const getAllTodoAPI = async (queryParams) => {
  try {
    const response = await $fetch.get("/cases/tasks", queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
const getAllTodoCountsAPI = async (queryParams) => {
  try {
    return await $fetch.get(`/cases/tasks/pending-count`, queryParams);
  } catch (err) {
    throw err;
  }
};
const todoMarkAsReadAPI = async (todoId) => {
  try {
    return await $fetch.patch(`/cases/tasks/${todoId}/mark-as-read`);
  } catch (err) {
    throw err;
  }
};
export {
  markAsReadAPI as a,
  getAllNotificationsAPI as b,
  getAllTodoCountsAPI as c,
  getAllTodoAPI as d,
  getAllNotificationsCountsAPI as g,
  markAsReadAllAPI as m,
  todoMarkAsReadAPI as t
};
