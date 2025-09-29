export interface OTPResponse {
  data: {
    data: {
      access_token: string;
      user_details: {
        user_type: string;
      };
      refresh_token: string;
    };
  };
}
export type FormData = {
  phone: string;
  email: string;
  otp: string;
};
