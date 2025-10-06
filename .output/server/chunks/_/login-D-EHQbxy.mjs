import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { L as LogoPath } from './nyaya-tech-logo-D_OdneNH.mjs';
import { B as Button, c as cn } from './router-e7zdrxGz.mjs';
import { I as Input } from './input-CcfBn-WR.mjs';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { L as Label } from './label-Btl29BJR.mjs';
import { $ as $fetch } from './fetch-Cpm1bFFM.mjs';
import { u as userStore, a as updateUserStore } from './userDetails-Dbr9T6uw.mjs';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useStore } from '@tanstack/react-store';
import Cookies from 'js-cookie';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import '@tanstack/react-router-ssr-query';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'sonner';
import 'framer-motion';
import 'react-error-boundary';
import '@radix-ui/react-label';

const loginImage = "/assets/login-DYM_ga23.webp";
function InputOTP({
  className,
  containerClassName,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    OTPInput,
    {
      "data-slot": "input-otp",
      containerClassName: cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      ),
      className: cn("disabled:cursor-not-allowed", className),
      ...props
    }
  );
}
function InputOTPGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "input-otp-group",
      className: cn("flex items-center", className),
      ...props
    }
  );
}
function InputOTPSlot({
  index,
  className,
  ...props
}) {
  var _a;
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = (_a = inputOTPContext == null ? void 0 : inputOTPContext.slots[index]) != null ? _a : {};
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "input-otp-slot",
      "data-active": isActive,
      className: cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-blue-300 ring-offset-background",
        className
      ),
      ...props,
      children: [
        char,
        hasFakeCaret && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "animate-caret-blink bg-foreground h-4 w-px duration-1000" }) })
      ]
    }
  );
}
const SigninWithPhoneAPI = async (payload) => {
  try {
    const response = await $fetch.post("/auth/signin-with-phone", payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const SigninWithEmailAPI = async (payload) => {
  try {
    const response = await $fetch.post("/auth/signin-with-email", payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const VerifyOTPWithPhone = async (payload) => {
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
const VerifyOTPWithEmail = async (payload) => {
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
const NyayaTechIcon = () => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "60",
      height: "60",
      viewBox: "0 0 60 60",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx("rect", { width: "60", height: "60", fill: "black" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M36.4721 11.9531H23.7656V13.7405H36.4721V11.9531Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M36.1275 12.2988H24.1113V13.3958H36.1275V12.2988Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M19.9512 16.8337C21.2125 17.3325 22.3441 17.9153 23.4092 18.4645C25.625 19.6068 27.538 20.5928 29.9904 20.5928C32.443 20.5928 34.3559 19.6068 36.5709 18.4648C37.6364 17.9153 38.7682 17.3325 40.0297 16.8337C39.4101 16.1874 38.793 15.3757 38.6339 14.5781H21.347C21.1878 15.3757 20.5708 16.1874 19.9512 16.8337Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M29.9881 20.2422C27.6191 20.2422 25.7405 19.2737 23.5649 18.1521C22.6563 17.6835 21.6409 17.1601 20.5371 16.6955C21.0803 16.0671 21.4407 15.4718 21.6123 14.918H38.364C38.5358 15.4715 38.896 16.0671 39.4394 16.6955C38.3318 17.1614 37.318 17.6842 36.4104 18.1524C34.2357 19.2737 32.3577 20.2422 29.9881 20.2422Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M41.4119 38.3143C41.9552 40.1196 44.3762 39.7972 47.1445 39.7972C49.9129 39.7972 52.1101 40.1195 52.6534 38.3143L52.6888 38.3053L52.6738 38.2459C52.7242 38.0619 52.757 37.8735 52.7695 37.6816H52.5308L47.7981 19.0002C48.4386 18.6886 48.8812 18.0334 48.8812 17.2732C48.8812 16.2119 48.0209 15.3516 46.9596 15.3516C46.1062 15.3516 45.3837 15.9083 45.133 16.6782C41.7789 16.9704 39.286 18.255 37.0555 19.4051C34.8148 20.5604 32.6984 21.6516 29.9883 21.6516C27.2782 21.6516 25.1618 20.5604 22.9211 19.4051C20.6905 18.255 18.1976 16.9704 14.8435 16.6782C14.5929 15.9083 13.8704 15.3516 13.0169 15.3516C11.9556 15.3516 11.0953 16.2119 11.0953 17.2732C11.0953 18.0334 11.5379 18.6886 12.1785 19.0002L7.44573 37.6816H7.20703C7.21956 37.8736 7.25226 38.0619 7.30281 38.2459L7.28776 38.3053L7.32333 38.3143C7.86661 40.1196 10.1345 39.7972 12.9029 39.7972C15.6713 39.7972 18.0215 40.1195 18.5647 38.3143L18.6003 38.3053L18.5852 38.2459C18.6357 38.0619 18.6685 37.8735 18.681 37.6816H18.4423L13.7247 19.0599C14.2124 18.8662 14.6019 18.4784 14.7984 17.9919C17.8515 18.2695 20.1183 19.4377 22.3193 20.5726C23.7894 21.3306 25.2099 22.0616 26.7916 22.5121H18.4926C18.4926 22.5121 20.9991 24.3232 21.3449 26.0571H38.6318C38.9776 24.3232 41.4842 22.5121 41.4842 22.5121H33.1852C34.7669 22.0617 36.1874 21.3306 37.6575 20.5726C39.8585 19.4378 42.1253 18.2695 45.1785 17.9919C45.375 18.4785 45.7645 18.8662 46.2522 19.0599L41.5345 37.6816H41.2958C41.3084 37.8736 41.3411 38.0619 41.3916 38.2459L41.3765 38.3053L41.4119 38.3143ZM47.1445 19.266L51.9286 37.6816H47.0514L47.1445 19.266ZM12.9029 37.6816H8.04794L13.1133 19.266L12.9029 37.6816ZM17.8398 37.6816H12.9029L13.1133 19.266L17.8398 37.6816ZM47.1445 19.266L47.0514 37.6816H42.1367L47.1445 19.266Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M21.2695 47.9531V28.2656H25.4883L34.1227 41.2031V28.2656H38.3414V47.9531H34.1227L25.4883 35.0719V47.9531H21.2695Z",
            fill: "white"
          }
        )
      ]
    }
  );
};
const LoginComponent = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [selectMethod, setSelectMethod] = useState("phone");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otpError, setOtpError] = useState(null);
  const [seconds, setSeconds] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [phoneError, setPhoneError] = useState();
  const [emailError, setEmailError] = useState();
  const [tokenState, setTokenState] = useState(true);
  useStore(userStore, (state) => state["user"]);
  const { mutate: sendPhoneOtpMutate, isPending: isSendPhoneOtpPending } = useMutation({
    mutationFn: async (phone2) => {
      const payload = { phone: phone2.length ? `+91${phone2}` : `` };
      const response = await SigninWithPhoneAPI(payload);
      return response;
    },
    onSuccess: (data) => {
      setIsOTPSent(true);
      setOtp("");
    },
    onError: (error) => {
      if ((error == null ? void 0 : error.status) === 404 || (error == null ? void 0 : error.status) === 401) {
        setPhoneError(error.message || "An error occurred");
      } else if (error.status == 422) {
        let errors2 = error.data.errData;
        setPhoneError(errors2 == null ? void 0 : errors2.phone[0]);
      }
    }
  });
  const { mutate: sendEmailOtpMutate, isPending: isSendEmailOtpPending } = useMutation({
    mutationFn: async (email2) => {
      const response = await SigninWithEmailAPI({ email: email2 });
      return response;
    },
    onSuccess: (data) => {
      setIsOTPSent(true);
      setOtp("");
    },
    onError: (error) => {
      if ((error == null ? void 0 : error.status) === 404 || (error == null ? void 0 : error.status) === 401) {
        setEmailError(error.message || "An error occurred");
      } else if (error.status == 422) {
        let errors2 = error.data.errData;
        setEmailError(errors2 == null ? void 0 : errors2.email[0]);
      }
    }
  });
  const { mutate: VerifyPhoneOTPMutation, isPending: isVerifyPhoneOTP } = useMutation({
    mutationFn: async (payload) => {
      const response = await VerifyOTPWithPhone(payload);
      return response;
    },
    onSuccess: (response) => {
      handleOTPSuccess(response);
    },
    onError: (error) => {
      var _a;
      if (error.status == 422) {
        setOtpError((_a = error.data.errData) == null ? void 0 : _a.otp[0]);
      }
    }
  });
  const { mutate: VerifyEmailOTPMutation, isPending: isVerifyEmailOTP } = useMutation({
    mutationFn: async (payload) => {
      const response = await VerifyOTPWithEmail(payload);
      return response;
    },
    onSuccess: (response) => {
      handleOTPSuccess(response);
    },
    onError: (error) => {
      var _a;
      if (error.status == 422) {
        setOtpError((_a = error.data.errData) == null ? void 0 : _a.otp[0]);
      }
    }
  });
  const handleOTPSuccess = (data) => {
    const {
      data: {
        data: {
          access_token: accessToken,
          user_details: userDetails2,
          refresh_token: refreshToken
        }
      }
    } = data;
    setIsOTPSent(true);
    Cookies.set("token", accessToken, { expires: 30 });
    Cookies.set("refreshToken", refreshToken, { expires: 90 });
    Cookies.set("userData", JSON.stringify(userDetails2), {
      expires: 30,
      path: "/"
    });
    updateUserStore({
      user: userDetails2
    });
    navigate({ to: "/dashboard" });
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
    setTimeout(() => setSuccessMessage(null), 3e3);
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
        device_type: "web"
      });
    } else if (isEmailSelected && !isOTPSent) {
      sendEmailOtpMutate(email);
    } else if (isEmailSelected && isOTPSent) {
      VerifyEmailOTPMutation({
        otp: otp || "",
        email,
        device_type: "web"
      });
    }
  };
  useEffect(() => {
    let timer;
    if (isTimerActive && seconds > 0 && isOTPSent) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1e3);
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
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-white", children: tokenState ? /* @__PURE__ */ jsx(
    "div",
    {
      className: "absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-50",
      children: /* @__PURE__ */ jsx(NyayaTechIcon, {})
    }
  ) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center items-center px-6 sm:px-12 md:px-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-sm w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: LogoPath,
            alt: "NyayaTech Logo",
            className: "w-[180px] mx-auto "
          }
        ),
        !isOTPSent ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-6", children: "Login" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-2", children: "Enter phone number or email for OTP verification" })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-6", children: "Verify Identity" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mt-2", children: [
            "Enter the 4-digit OTP sent to ",
            /* @__PURE__ */ jsx("br", {}),
            selectMethod === "phone" ? phone : email,
            " ",
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "text-amber-300 underline cursor-pointer",
                onClick: handleEdit,
                children: "Edit"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(onSubmit), children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        !isOTPSent && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx(
            Label,
            {
              htmlFor: "loginInput",
              className: "text-sm font-medium",
              children: selectMethod === "phone" ? "Phone Number" : "Email Address"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              onClick: () => setSelectMethod(
                selectMethod === "phone" ? "email" : "phone"
              ),
              className: "text-sm text-blue-600 bg-transparent p-0 h-auto cursor-pointer hover:underline",
              children: selectMethod === "phone" ? "Use Email Instead" : "Use Phone Instead"
            }
          )
        ] }),
        !isOTPSent ? /* @__PURE__ */ jsx(Fragment, { children: selectMethod === "phone" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "phone",
              type: "text",
              value: phone,
              placeholder: "Enter phone number",
              maxLength: 10,
              onInput: (e) => {
                const input = e.target;
                input.value = input.value.replace(/[^0-9]/g, "").slice(0, 10);
                setPhone(input.value);
              },
              className: "h-9 w-full rounded-none bg-slate-100 border border-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0"
            }
          ),
          phoneError && /* @__PURE__ */ jsx("p", { className: "text-xs 3xl:text-sm text-red-500 font-medium", children: phoneError })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "text",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "Enter email address",
              className: "h-9 w-full rounded-none bg-slate-100 border border-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0"
            }
          ),
          emailError && /* @__PURE__ */ jsx("p", { className: "text-xs 3xl:text-sm text-red-500 font-medium", children: emailError })
        ] }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-4", children: /* @__PURE__ */ jsx(
            InputOTP,
            {
              className: "gap-4",
              maxLength: 4,
              pattern: "^\\d+$",
              value: otp != null ? otp : "",
              onChange: (val) => {
                setOtp(val);
                setOtpError(null);
              },
              autoFocus: true,
              children: Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ jsx(InputOTPGroup, { children: /* @__PURE__ */ jsx(
                InputOTPSlot,
                {
                  index,
                  "data-active": index === (otp == null ? void 0 : otp.length) ? "true" : "false",
                  className: "border border-black bg-white text-black w-12 h-12 text-base rounded-md data-[active=true]:ring-2 data-[active=true]:ring-blue-300 !focus-visible:ring-pink-500  focus-within:ring-blue-300"
                }
              ) }, index))
            }
          ) }),
          otpError && /* @__PURE__ */ jsx("p", { className: "text-xs 3xl:text-sm text-red-500 font-medium text-center mt-2", children: otpError }),
          /* @__PURE__ */ jsxs("div", { className: "text-center mt-4 flex flex-col justify-center items-center", children: [
            isTimerActive ? /* @__PURE__ */ jsxs("span", { children: [
              "Resend OTP in",
              " ",
              /* @__PURE__ */ jsxs("span", { className: "text-[#EBB305]", children: [
                "00:",
                seconds.toString().padStart(2, "0")
              ] })
            ] }) : /* @__PURE__ */ jsx(
              "span",
              {
                className: "text-[#EBB305] cursor-pointer",
                onClick: handleResendOTP,
                children: "RESEND OTP"
              }
            ),
            successMessage && /* @__PURE__ */ jsx("div", { className: "text-xs text-green-500 font-medium text-center mt-2", children: successMessage })
          ] })
        ] }),
        !isOTPSent ? /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "w-full border rounded-none cursor-pointer hover:bg-black hover:text-white",
            disabled: isSendEmailOtpPending || isSendPhoneOtpPending,
            children: isSendEmailOtpPending || isSendPhoneOtpPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : "Send OTP"
          }
        ) : /* @__PURE__ */ jsx(
          Button,
          {
            className: "w-full border rounded-none cursor-pointer hover:bg-black hover:text-white",
            disabled: isVerifyEmailOTP || isVerifyPhoneOTP,
            type: "submit",
            children: isVerifyEmailOTP || isVerifyPhoneOTP ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : "Verify OTP"
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "hidden lg:flex flex-col justify-between bg-cover bg-center relative p-8 m-1 rounded-xl",
        style: { backgroundImage: `url(${loginImage})` },
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-light text-white", children: "Technology for justice, delivered by" }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-white", children: "Nyaya Tech" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/30 text-white p-6 rounded-2xl shadow-xl backdrop-blur-md", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-2 text-yellow-400 text-lg", children: "\u2B50\u2B50\u2B50\u2B50\u2B50" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: "NyayaTech streamlined our legal workflows by 60%. The most intuitive platform for case management we've used." }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-medium", children: "\u2014 Rahul Mehta" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-300", children: "Law Defenders, LLP" })
          ] })
        ]
      }
    )
  ] }) });
};
const SplitComponent = LoginComponent;

export { SplitComponent as component };
//# sourceMappingURL=login-D-EHQbxy.mjs.map
