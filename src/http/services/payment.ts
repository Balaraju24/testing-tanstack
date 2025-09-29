import { $fetch } from "../fetch";
export const getAllPaymentsAPI = async (queryParams: any) => {
  try {
    const response = await $fetch.get("/cases/payments-list", queryParams);
    return response;
  } catch (err) {
    throw err;
  }
};

export const paymentRecievedApprovalAPI = async (
  case_id: number,
  payload: any
) => {
  try {
    const response = await $fetch.post(
      `/payments/${case_id}/payment-status`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};