import { $fetch } from "../fetch";
import { handleAPIErrorResponse } from "../httpErrorHandler";

export const startUploadMultipartFileAPI = async (body: any) => {
  try {
    const { data, success } = await $fetch.post(
      `/files/start-multipart-upload`,
      body
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {}
};

export const getPresignedUrlsForFileAPI = async (body: any) => {
  try {
    const { data, success } = await $fetch.post(
      `/files/multipart-upload-urls`,
      body
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {}
};

export const mergeAllChunksAPI = async (body: any) => {
  try {
    const { data, success } = await $fetch.post(
      `/files/complete-multipart-upload`,
      body
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {}
};

export const abortUploadingAPI = async (body: any) => {
  try {
    const { data, success } = await $fetch.post(
      `/files/abort-multipart-upload`,
      body
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {}
};

export const resumeUploadAPI = async (body: any) => {
  try {
    const { data, success } = await $fetch.post(
      `/files/incomplete-parts`,
      body
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {}
};

export const fileUploadAPI = async (payload: any) => {
  try {
    const response = await $fetch.post(`/files/upload`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const uploadToS3API = async (url: string, file: File) => {
  try {
    const options = {
      method: "PUT",
      body: file,
    };
    return await fetch(url, options);
  } catch (err) {
    throw err;
  }
};

export const filePreviewAPI = async (payload: any) => {
  try {
    return await $fetch.post(`/download-presigned-url`, payload);
  } catch (err) {
    throw err;
  }
};
