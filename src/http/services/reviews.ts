
import { $fetch } from "../fetch";

export const getAllReviewsAPI = async (queryParams: any) => {
  try {
    const response = await $fetch.get("/reviews", queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getSingleReviewAPI = async (case_id: any) => {
  try {
    const response = await $fetch.get(`/reviews/${case_id}`);
    return response;
  } catch (err) {
    throw err;
  }
};