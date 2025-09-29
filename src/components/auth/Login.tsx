// LoginComponent.tsx
import loginImage from "@/assets/login.webp";
import Logo from "@/assets/nyaya-tech-logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  SigninWithEmailAPI,
  SigninWithPhoneAPI,
  VerifyOTPWithEmail,
  VerifyOTPWithPhone,
} from "@/http/services/auth";
import { FormData, OTPResponse } from "@/lib/interfaces/login";
import { updateUserStore, userStore } from "@/store/userDetails";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NyayaTechIcon from "../icons/nyaya-tech-icon";

const LoginComponent = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [selectMethod, setSelectMethod] = useState<"phone" | "email">("phone");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>();
  const [emailError, setEmailError] = useState<string | null>();
  const [tokenState, setTokenState] = useState<boolean>(true);
  const userDetails = useStore(userStore, (state) => state["user"]);

  const { mutate: sendPhoneOtpMutate, isPending: isSendPhoneOtpPending } =
    useMutation({
      mutationFn: async (phone: string) => {
        const payload = { phone: phone.length ? `+91${phone}` : `` };
        const response = await SigninWithPhoneAPI(payload);
        return response;
      },
      onSuccess: (data) => {
        setIsOTPSent(true);
        setOtp("");
      },
      onError: (error: any) => {
        if (error?.status === 404 || error?.status === 401) {
          setPhoneError(error.message || "An error occurred");
        } else if (error.status == 422) {
          let errors = error.data.errData;
          setPhoneError(errors?.phone[0]);
        }
      },
    });

  const { mutate: sendEmailOtpMutate, isPending: isSendEmailOtpPending } =
    useMutation({
      mutationFn: async (email: string) => {
        const response = await SigninWithEmailAPI({ email });
        return response;
      },
      onSuccess: (data) => {
        setIsOTPSent(true);
        setOtp("");
      },
      onError: (error: any) => {
        if (error?.status === 404 || error?.status === 401) {
          setEmailError(error.message || "An error occurred");
        } else if (error.status == 422) {
          let errors = error.data.errData;
          setEmailError(errors?.email[0]);
        }
      },
    });

  const { mutate: VerifyPhoneOTPMutation, isPending: isVerifyPhoneOTP } =
    useMutation({
      mutationFn: async (payload: {
        phone: string;
        otp: string;
        device_type: string;
      }) => {
        const response = await VerifyOTPWithPhone(payload);
        return response;
      },
      onSuccess: (response) => {
        handleOTPSuccess(response);
      },
      onError: (error: any) => {
        if (error.status == 422) {
          setOtpError(error.data.errData?.otp[0]);
        }
      },
    });

  const { mutate: VerifyEmailOTPMutation, isPending: isVerifyEmailOTP } =
    useMutation({
      mutationFn: async (payload: {
        email: string;
        otp: string;
        device_type: string;
      }) => {
        const response = await VerifyOTPWithEmail(payload);
        return response;
      },
      onSuccess: (response) => {
        handleOTPSuccess(response);
      },
      onError: (error: any) => {
        if (error.status == 422) {
          setOtpError(error.data.errData?.otp[0]);
        }
      },
    });

  const handleOTPSuccess = (data: OTPResponse) => {
    const {
      data: {
        data: {
          access_token: accessToken,
          user_details: userDetails,
          refresh_token: refreshToken,
        },
      },
    } = data;
    setIsOTPSent(true);
    Cookies.set("token", accessToken, { expires: 30 });
    Cookies.set("refreshToken", refreshToken, { expires: 90 });
    Cookies.set("userData", JSON.stringify(userDetails), {
      expires: 30,
      path: "/",
    });
    updateUserStore({
      user: userDetails,
    });

    navigate({ to: "/dashboard" });

    // const userType = userDetails?.user_type;

    // if (userType === "CUSTOMER" || userType === "ADVOCATE") {
    //   navigate({ to: "/legal-opinion" });
    // } else {
    //   navigate({ to: "/dashboard" });
    // }
  };

  const handleEdit = () => {
    setIsOTPSent(false);
    setOtp("");
    setOtpError(null);
    setSeconds(30);
    setIsTimerActive(true);
  };

  const handleResendOTP = () => {
    setSeconds(30);
    setIsTimerActive(true);
    setSuccessMessage("OTP has been resent successfully!");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const onSubmit = () => {
    const isPhoneSelected = selectMethod === "phone";
    const isEmailSelected = selectMethod === "email";

    setEmailError("");
    setPhoneError("");

    if (isPhoneSelected && !isOTPSent) {
      sendPhoneOtpMutate(phone);
    } else if (isPhoneSelected && isOTPSent) {
      VerifyPhoneOTPMutation({
        otp: otp || "",
        phone: `+91${phone}`,
        device_type: "web",
      });
    } else if (isEmailSelected && !isOTPSent) {
      sendEmailOtpMutate(email);
    } else if (isEmailSelected && isOTPSent) {
      VerifyEmailOTPMutation({
        otp: otp || "",
        email: email,
        device_type: "web",
      });
    }
  };

  useEffect(() => {
    let timer: any;
    if (isTimerActive && seconds > 0 && isOTPSent) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsTimerActive(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerActive, seconds, isOTPSent]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return setTokenState(false);

    navigate({ to: "/dashboard" });
  }, []);

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-white">
      {tokenState ? (
        <div
          className={
            "absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-50"
          }
        >
          <NyayaTechIcon />
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center px-6 sm:px-12 md:px-24">
            <div className="max-w-sm w-full">
              <div className="text-center mb-8">
                <img
                  src={Logo}
                  alt="NyayaTech Logo"
                  className="w-[180px] mx-auto "
                />
                {!isOTPSent ? (
                  <>
                    <h2 className="text-2xl font-semibold mt-6">Login</h2>
                    <p className="text-sm text-gray-500 mt-2">
                      Enter phone number or email for OTP verification
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold mt-6">
                      Verify Identity
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                      Enter the 4-digit OTP sent to <br />
                      {selectMethod === "phone" ? phone : email}{" "}
                      <span
                        className="text-amber-300 underline cursor-pointer"
                        onClick={handleEdit}
                      >
                        Edit
                      </span>
                    </p>
                  </>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  {!isOTPSent && (
                    <div className="flex justify-between items-center">
                      <Label
                        htmlFor="loginInput"
                        className="text-sm font-medium"
                      >
                        {selectMethod === "phone"
                          ? "Phone Number"
                          : "Email Address"}
                      </Label>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() =>
                          setSelectMethod(
                            selectMethod === "phone" ? "email" : "phone"
                          )
                        }
                        className="text-sm text-blue-600 bg-transparent p-0 h-auto cursor-pointer hover:underline"
                      >
                        {selectMethod === "phone"
                          ? "Use Email Instead"
                          : "Use Phone Instead"}
                      </Button>
                    </div>
                  )}

                  {!isOTPSent ? (
                    <>
                      {selectMethod === "phone" ? (
                        <>
                          <Input
                            id="phone"
                            type="text"
                            value={phone}
                            placeholder={"Enter phone number"}
                            maxLength={10}
                            onInput={(e) => {
                              const input = e.target as HTMLInputElement;
                              input.value = input.value
                                .replace(/[^0-9]/g, "")
                                .slice(0, 10);
                              setPhone(input.value);
                            }}
                            className="h-9 w-full rounded-none bg-slate-100 border border-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          {phoneError && (
                            <p className="text-xs 3xl:text-sm text-red-500 font-medium">
                              {phoneError}
                            </p>
                          )}
                        </>
                      ) : (
                        <>
                          <Input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            className="h-9 w-full rounded-none bg-slate-100 border border-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          {emailError && (
                            <p className="text-xs 3xl:text-sm text-red-500 font-medium">
                              {emailError}
                            </p>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center mt-4">
                        <InputOTP
                          className="gap-4"
                          maxLength={4}
                          pattern="^\d+$"
                          value={otp ?? ""}
                          onChange={(val: string) => {
                            setOtp(val);
                            setOtpError(null);
                          }}
                          autoFocus
                        >
                          {Array.from({ length: 4 }).map((_, index) => (
                            <InputOTPGroup key={index}>
                              <InputOTPSlot
                                index={index}
                                data-active={
                                  index === otp?.length ? "true" : "false"
                                }
                                className="border border-black bg-white text-black w-12 h-12 text-base rounded-md data-[active=true]:ring-2 data-[active=true]:ring-blue-300 !focus-visible:ring-pink-500  focus-within:ring-blue-300"
                              />
                            </InputOTPGroup>
                          ))}
                        </InputOTP>
                      </div>
                      {otpError && (
                        <p className="text-xs 3xl:text-sm text-red-500 font-medium text-center mt-2">
                          {otpError}
                        </p>
                      )}

                      <div className="text-center mt-4 flex flex-col justify-center items-center">
                        {isTimerActive ? (
                          <span>
                            Resend OTP in{" "}
                            <span className="text-[#EBB305]">
                              00:{seconds.toString().padStart(2, "0")}
                            </span>
                          </span>
                        ) : (
                          <span
                            className="text-[#EBB305] cursor-pointer"
                            onClick={handleResendOTP}
                          >
                            RESEND OTP
                          </span>
                        )}
                        {successMessage && (
                          <div className="text-xs text-green-500 font-medium text-center mt-2">
                            {successMessage}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {!isOTPSent ? (
                    <Button
                      type="submit"
                      className="w-full border rounded-none cursor-pointer hover:bg-black hover:text-white"
                      disabled={isSendEmailOtpPending || isSendPhoneOtpPending}
                    >
                      {isSendEmailOtpPending || isSendPhoneOtpPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Send OTP"
                      )}
                    </Button>
                  ) : (
                    <Button
                      className="w-full border rounded-none cursor-pointer hover:bg-black hover:text-white"
                      disabled={isVerifyEmailOTP || isVerifyPhoneOTP}
                      type="submit"
                    >
                      {isVerifyEmailOTP || isVerifyPhoneOTP ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Verify OTP"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div
            className="hidden lg:flex flex-col justify-between bg-cover bg-center relative p-8 m-1 rounded-xl"
            style={{ backgroundImage: `url(${loginImage})` }}
          >
            <div>
              <h2 className="text-3xl font-light text-white">
                Technology for justice, delivered by
              </h2>
              <h2 className="text-3xl font-semibold text-white">Nyaya Tech</h2>
            </div>

            <div className="bg-white/30 text-white p-6 rounded-2xl shadow-xl backdrop-blur-md">
              <div className="mb-2 text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
              <p className="text-sm">
                NyayaTech streamlined our legal workflows by 60%. The most
                intuitive platform for case management we've used.
              </p>
              <p className="mt-4 text-sm font-medium">— Rahul Mehta</p>
              <p className="text-xs text-gray-300">Law Defenders, LLP</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginComponent;
