import { $ as $fetch } from './fetch-Cpm1bFFM.mjs';

const fileUploadAPI = async (payload) => {
  try {
    const response = await $fetch.post(`/files/upload`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const uploadToS3API = async (url, file) => {
  try {
    const options = {
      method: "PUT",
      body: file
    };
    return await fetch(url, options);
  } catch (err) {
    throw err;
  }
};
const uploadDocumentAPI = async (payload) => {
  try {
    return await $fetch.post(`/docs `, payload);
  } catch (err) {
    throw err;
  }
};
const updateDocumentAPI = async ({
  docId,
  payload
}) => {
  try {
    return await $fetch.put(`/docs/${docId} `, payload);
  } catch (err) {
    throw err;
  }
};
const downloadSingleDocAPI = async (payload) => {
  try {
    const response = await $fetch.post(`/files/download`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const getAllDocsComments = async (docsId, queryParams) => {
  try {
    const response = await $fetch.get(`/docs/${docsId}/comments`, queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};
const docsComments = async (payload, docsId) => {
  try {
    const response = await $fetch.post(`/docs/${docsId}/comments`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const documentApprovalAPI = async ({
  doc_id,
  payload
}) => {
  try {
    const response = await $fetch.patch(`/docs/${doc_id}/status`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const deleteDocPlaceHolderAPI = async ({
  docId,
  payload
}) => {
  try {
    return await $fetch.delete(`/docs/${docId}/place-holders`, payload);
  } catch (err) {
    throw err;
  }
};
const deleteSingleDocAPI = async ({
  docId,
  payload
}) => {
  try {
    return await $fetch.delete(`/docs/${docId}`, payload);
  } catch (err) {
    throw err;
  }
};

export { uploadDocumentAPI as a, deleteSingleDocAPI as b, deleteDocPlaceHolderAPI as c, docsComments as d, documentApprovalAPI as e, fileUploadAPI as f, getAllDocsComments as g, downloadSingleDocAPI as h, updateDocumentAPI as i, uploadToS3API as u };
//# sourceMappingURL=fileUpload-BBm5-XTb.mjs.map
