import { $fetch } from "../fetch";

export const createLegalOpinionAPI = async (payload: {
  case_type_acrym: string;
  customer_name: string;
  loan_type: string;
  property_type: string;
  loan_application_number: string;
  loan_amount: number;
  service_id: number;
}) => {
  try {
    const response = await $fetch.post(`/cases/legal-opinion`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const createManagerLegalOpinionAPI = async (payload: {
  case_type_acrym: string;
  customer_name: string;
  loan_type: string;
  property_type: string;
  loan_application_number: string;
  loan_amount: number;
  service_id: number;
  organisation_name: string;
  location_id: number;
  user_id: number;
}) => {
  try {
    const response = await $fetch.post(
      `/cases/legal-opinion-manager-login`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const getOrganizationDataAPI = async () => {
  try {
    const response = await $fetch.get(`/users/organization-drop-down`);
    return response;
  } catch (err) {
    throw err;
  }
};
export const getOrganizationListAPI = async (payload?: {
  page?: number;
  page_size?: number;
  search_string?: string;
}) => {
  try {
    const response = await $fetch.get("/users/organisation-list", payload);
    return response;
  } catch (err) {
    throw err;
  }
};
export const fileUploadStageAPI = async (payload: any) => {
  try {
    const response = await $fetch.post(`/docs/upload-based-type`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateUploadStageAPI = async (payload: any) => {
  try {
    const response = await $fetch.put(`/docs/update-based-type`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const raiseQueryAPI = async (payload: any) => {
  try {
    const response = await $fetch.post(`/docs/lod/request`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateQueryAPI = async (
  doc_id: any,
  payload: { category: string }
) => {
  try {
    const response = await $fetch.post(`/docs/${doc_id}/category`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
export const updateDueDateAPI = async (case_id: any, payload: any) => {
  try {
    const response = await $fetch.patch(`/cases/${case_id}/due-date`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
export const UpdateCategoryAPI = async (
  doc_id: any,
  payload: {
    category: string;
    id: string | number;
    case_id: number;
    case_stage: string | undefined;
    case_sub_stage: string | undefined;
  }
) => {
  try {
    const response = await $fetch.patch(`/docs/${doc_id}/category`, payload);
    return response;
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
export const vettingDocumentsAPI = async (case_id: string, payload: any) => {
  try {
    const response = await $fetch.patch(
      `/cases/${case_id}/vetting-docs 
`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const receivedDocumentsAPI = async (case_id: string, payload: any) => {
  try {
    const response = await $fetch.patch(
      `/cases/${case_id}/received-original-docs
`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
