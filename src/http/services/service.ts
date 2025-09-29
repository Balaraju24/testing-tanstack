import { NotesViewPayload } from "@/lib/interfaces/service";
import { $fetch } from "../fetch";

export const singleServiceAPI = async (service_id: string) => {
  try {
    const response = await $fetch.get(`/cases/${service_id}`);
    return response;
  } catch (err) {
    throw err;
  }
};
export const assignAdvocateAPI = async (service_id: string | undefined, payload: any) => {
  try {
    const response = await $fetch.patch(
      `/cases/${service_id}/assign-advocate`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const assignAdvocatesAPI = async (service_id: string | undefined, payload: any) => {
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
export const notesViewAPI = async (payload: NotesViewPayload) => {
  try {
    const response = await $fetch.patch(`/notes/view-notes`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const summaryViewAPI = async (payload: any) => {
  try {
    const response = await $fetch.patch(`/notes/view-summary`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const createChatAPI = async (payload: any) => {
  try {
    const response = await $fetch.post("/chats", payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getSingleCaseChatDetailsAPI = async (
  caseId: string,
  payload: any
) => {
  try {
    const response = await $fetch.get(`/cases/${caseId}/chats`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
export const getChatCountsAPI = async () => {
  try {
    const response = await $fetch.get(`/chats/unread-message-count`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteSingleCaseChatAPI = async (chatId: any) => {
  try {
    const response = await $fetch.delete(`/chats/${chatId}`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const chatViewMessageAPI = async (payload: any) => {
  try {
    return await $fetch.patch(`/chats/view-message`, payload);
  } catch (err) {
    throw err;
  }
};

export const updateChatAPI = async ({
  chatId,
  payload,
}: {
  chatId: string;
  payload: any;
}) => {
  try {
    const response = await $fetch.patch(`/chats/${chatId}`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllDocsAPIV2 = async (case_id: any) => {
  try {
    const response = await $fetch.get(`/cases/${case_id}/docs-list`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const docsViewAPI = async (case_id: string, payload: any) => {
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

export const caseViewLogAPI = async (caseId: string, queryparams: any) => {
  try {
    const response = await $fetch.get(`/cases/${caseId}/logs`, queryparams);
    return response;
  } catch (err) {
    throw err;
  }
};

export const caseNextHearingDateAPI = async (
  payload: {
    next_hearing_date: string;
    note: string;
    case_stage: string;
    case_sub_stage: string;
  },
  service_id: string | undefined
) => {
  try {
    const response = await $fetch.patch(`/cases/${service_id}`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const sendingNoticeAPI = async (
  service_id: string | undefined,
  payload: {
    status: string;
    is_marked: boolean;
    case_stage: string | undefined;
    case_sub_stage: string | undefined;
  }
) => {
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

export const casePaymentDocAPI = async (payload: any) => {
  try {
    const response = await $fetch.post(`/docs/case-payment`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const sendPaymentLink = async (
  case_id: string | undefined,
  payload: { case_id: number; price: number | null }
) => {
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
