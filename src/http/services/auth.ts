import { $fetch } from "../fetch";

export const SigninWithPhoneAPI = async (payload: { phone: string }) => {
  try {
    const response = await $fetch.post("/auth/signin-with-phone", payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const SigninWithEmailAPI = async (payload: { email: string }) => {
  try {
    const response = await $fetch.post("/auth/signin-with-email", payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const VerifyOTPWithPhone = async (payload: {
  phone: string;
  otp: string;
  device_type: string;
}) => {
  try {
    const response = await $fetch.post(
      "/auth/signup-or-signin-verify-in-phone",
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const VerifyOTPWithEmail = async (payload: {
  email: string;
  otp: string;
  device_type: string;
}) => {
  try {
    const response = await $fetch.post(
      "/auth/signup-or-signin-verify-in-email",
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
