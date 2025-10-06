import { $ as $fetch } from './fetch-Cpm1bFFM.mjs';

const singleServiceAPI = async (service_id) => {
  try {
    const response = await $fetch.get(`/cases/${service_id}`);
    return response;
  } catch (err) {
    throw err;
  }
};
const assignAdvocatesAPI = async (service_id, payload) => {
  try {
    const response = await $fetch.post(
      `/cases/${service_id}/assign-multiple-advocate`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const notesViewAPI = async (payload) => {
  try {
    const response = await $fetch.patch(`/notes/view-notes`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const summaryViewAPI = async (payload) => {
  try {
    const response = await $fetch.patch(`/notes/view-summary`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const createChatAPI = async (payload) => {
  try {
    const response = await $fetch.post("/chats", payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const getSingleCaseChatDetailsAPI = async (caseId, payload) => {
  try {
    const response = await $fetch.get(`/cases/${caseId}/chats`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const deleteSingleCaseChatAPI = async (chatId) => {
  try {
    const response = await $fetch.delete(`/chats/${chatId}`);
    return response;
  } catch (err) {
    throw err;
  }
};
const chatViewMessageAPI = async (payload) => {
  try {
    return await $fetch.patch(`/chats/view-message`, payload);
  } catch (err) {
    throw err;
  }
};
const updateChatAPI = async ({
  chatId,
  payload
}) => {
  try {
    const response = await $fetch.patch(`/chats/${chatId}`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const getAllDocsAPIV2 = async (case_id) => {
  try {
    const response = await $fetch.get(`/cases/${case_id}/docs-list`);
    return response;
  } catch (err) {
    throw err;
  }
};
const docsViewAPI = async (case_id, payload) => {
  try {
    const response = await $fetch.patch(
      `/docs/${case_id}/view-doc 
`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const caseViewLogAPI = async (caseId, queryparams) => {
  try {
    const response = await $fetch.get(`/cases/${caseId}/logs`, queryparams);
    return response;
  } catch (err) {
    throw err;
  }
};
const caseNextHearingDateAPI = async (payload, service_id) => {
  try {
    const response = await $fetch.patch(`/cases/${service_id}`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const sendingNoticeAPI = async (service_id, payload) => {
  try {
    const response = await $fetch.patch(
      `/cases/${service_id}/confirmation-boxes`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
const casePaymentDocAPI = async (payload) => {
  try {
    const response = await $fetch.post(`/docs/case-payment`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const sendPaymentLink = async (case_id, payload) => {
  try {
    const response = await $fetch.post(
      `/cases/${case_id}/send-payment-link`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export { sendPaymentLink as a, casePaymentDocAPI as b, caseNextHearingDateAPI as c, caseViewLogAPI as d, docsViewAPI as e, createChatAPI as f, getAllDocsAPIV2 as g, chatViewMessageAPI as h, getSingleCaseChatDetailsAPI as i, deleteSingleCaseChatAPI as j, summaryViewAPI as k, sendingNoticeAPI as l, assignAdvocatesAPI as m, notesViewAPI as n, singleServiceAPI as s, updateChatAPI as u };
//# sourceMappingURL=service-1g9dZr4o.mjs.map
