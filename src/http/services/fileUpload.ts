import { $fetch } from "../fetch";
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

export const uploadDocumentAPI = async (payload: any) => {
  try {
    return await $fetch.post(`/docs `, payload);
  } catch (err: any) {
    throw err;
  }
};

export const updateDocumentAPI = async ({
  docId,
  payload,
}: {
  docId: Number;
  payload: any;
}) => {
  try {
    return await $fetch.put(`/docs/${docId} `, payload);
  } catch (err: any) {
    throw err;
  }
};

export const downloadSingleDocAPI = async (payload: any) => {
  try {
    const response = await $fetch.post(`/files/download`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllDocsComments = async (
  docsId: string | undefined | number,
  queryParams: { page: number; pageSize: number }
) => {
  try {
    const response = await $fetch.get(`/docs/${docsId}/comments`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};

export const docsComments = async (payload: any, docsId: any) => {
  try {
    const response = await $fetch.post(`/docs/${docsId}/comments`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getIsSettled = async (case_id: number) => {
  try {
    const response = await $fetch.get(`/cases/${case_id}/settled`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const documentApprovalAPI = async ({
  doc_id,
  payload,
}: {
  doc_id: number | undefined;
  payload: any;
}) => {
  try {
    const response = await $fetch.patch(`/docs/${doc_id}/status`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteDocPlaceHolderAPI = async ({
  docId,
  payload,
}: {
  docId: number;
  payload?: any;
}) => {
  try {
    return await $fetch.delete(`/docs/${docId}/place-holders`, payload);
  } catch (err) {
    throw err;
  }
};

export const deleteSingleDocAPI = async ({
  docId,
  payload,
}: {
  docId: number;
  payload?: any;
}) => {
  try {
    return await $fetch.delete(`/docs/${docId}`, payload);
  } catch (err) {
    throw err;
  }
};


export const lodRequestAPI = async (payload: any) => {
  try {
    const response = await $fetch.post(`/docs/lod/request`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const UpdateCategoryAPI = async (
  doc_id: any,
  payload: { category: string }
) => {
  try {
    const response = await $fetch.patch(`/docs/${doc_id}/category`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
