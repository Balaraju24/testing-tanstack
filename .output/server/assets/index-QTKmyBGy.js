import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { AvatarImage } from "@radix-ui/react-avatar";
import { toast } from "sonner";
import { a as addReviewAPI } from "./manage-tW0NLyej.js";
import { A as ApprovedIcon } from "./approved-Icon-D4Mj_64A.js";
import { S as SubmitCaseIcon } from "./submit-case-icon-Ln9ZnlEX.js";
import { A as Avatar } from "./avatar-DZ-dXD0g.js";
import { B as Button } from "./router-o2MrkizZ.js";
import { T as Textarea } from "./textarea-Bgbbi7bt.js";
import { L as LogoPath } from "./nyaya-tech-logo-D_OdneNH.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "react-error-boundary";
const StarRating = ({
  initialRating = 0,
  totalStars = 5,
  onRatingChange,
  disabled = false
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const handleClick = (value) => {
    if (disabled) return;
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };
  const handleMouseEnter = (value) => {
    if (!disabled) setHover(value);
  };
  const handleMouseLeave = () => {
    if (!disabled) setHover(0);
  };
  const StarSVG = ({ filled, size = 32 }) => /* @__PURE__ */ jsx(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: filled ? "#facc15" : "none",
      stroke: "black",
      strokeWidth: "1",
      strokeLinejoin: "round",
      strokeLinecap: "round",
      className: "transition-colors duration-200",
      children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" })
    }
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex space-x-1 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`,
      role: "radiogroup",
      "aria-label": "Star rating",
      children: Array.from({ length: totalStars }, (_, index) => index + 1).map(
        (star) => /* @__PURE__ */ jsx(
          "span",
          {
            className: `cursor-pointer ${disabled ? "pointer-events-none" : ""}`,
            onClick: () => handleClick(star),
            onMouseEnter: () => handleMouseEnter(star),
            onMouseLeave: handleMouseLeave,
            role: "radio",
            "aria-checked": star === rating,
            "aria-label": `${star} star${star === 1 ? "" : "s"}`,
            children: /* @__PURE__ */ jsx(StarSVG, { filled: star <= (hover || rating) })
          },
          star
        )
      )
    }
  );
};
const NyayatechAvatar = "/assets/tech-BviejnZ-.svg";
const UserReview = () => {
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  useNavigate();
  const [feedbackNyayaTech, setFeedbackNyayaTech] = useState("");
  const [suggestionNyayaTech, setSuggestionNyayaTech] = useState("");
  const [ratingNyayaTech, setRatingNyayaTech] = useState(
    void 0
  );
  const [Nyayatech, setNyayatech] = useState(false);
  const [Advocate, setAdvocate] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { service_id } = useParams({ strict: false });
  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: async () => {
      const data = {
        review: [
          {
            case_id: Number(service_id),
            feedback_type: "NYAYA_TECH",
            rating: ratingNyayaTech ?? null,
            feedback: feedbackNyayaTech || null,
            is_recommended: true,
            suggestion: suggestionNyayaTech,
            case_stage: "CSCR",
            case_sub_stage: "CSCR#DSCL"
          }
        ]
      };
      const response = addReviewAPI(data);
      return response;
    },
    onSuccess: () => {
      setError("");
      setShowSuccessPopup(true);
    },
    onError: (error2) => {
      if (error2?.status === 404 || error2?.status === 401) {
        setError(error2.message);
      } else if (error2.status == 422) {
        let errorsData = error2.data.errData;
        let formattedErrors = {};
        Object.keys(errorsData).forEach((key) => {
          formattedErrors[key] = errorsData[key][0];
        });
        setErrors(formattedErrors);
      } else if (error2.status === 409) {
        toast.error(error2?.data?.message);
      }
    }
  });
  const handleSubmit = () => {
    submitReview();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !showSuccessPopup && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "flex bg-[#F0F4FA] justify-between items-center  px-6 border-b-2 border-gray-300  h-12 3xl:h-16", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("img", { src: LogoPath, alt: "", className: "w-40" }) }) }),
      /* @__PURE__ */ jsx("div", { className: " bg-gray-100 flex justify-center p-3 h-[calc(100vh-48px)] overflow-auto 3xl:h-[calc(100vh-64px)]", children: /* @__PURE__ */ jsxs("div", { className: " xl:w-3/5 space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: " items-center hidden xl:flex", children: /* @__PURE__ */ jsxs("div", { className: "p-2 bg-white grow flex justify-between items-center w-1/5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Avatar, { className: "w-7 h-7 bg-black flex items-center justify-center", children: /* @__PURE__ */ jsx(AvatarImage, { src: NyayatechAvatar, className: "w-5" }) }),
            "Nyayatech"
          ] }),
          Nyayatech && /* @__PURE__ */ jsx("div", { className: "text-green-700", children: /* @__PURE__ */ jsx(ApprovedIcon, {}) })
        ] }) }),
        !Nyayatech && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "border border-gray-300 p-3 space-y-1 bg-white", children: [
            /* @__PURE__ */ jsx("img", { src: LogoPath, alt: "", className: "w-40" }),
            /* @__PURE__ */ jsxs("div", { className: "p-2 border  border-gray-300 space-y-2", children: [
              /* @__PURE__ */ jsxs("h5", { className: "text-md font-medium", children: [
                " ",
                "Rating",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                StarRating,
                {
                  initialRating: ratingNyayaTech,
                  onRatingChange: setRatingNyayaTech
                }
              )
            ] }),
            errors["review.0.rating"] && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors["review.0.rating"] }),
            /* @__PURE__ */ jsxs("div", { className: "border border-gray-300 p-3", children: [
              /* @__PURE__ */ jsxs("h5", { className: "text-md font-medium", children: [
                " ",
                "Feedback",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  className: "border-0  border-gray-300 h-16 resize-none px-1 py-1 ",
                  placeholder: "Your feedback",
                  value: feedbackNyayaTech.charAt(0).toUpperCase() + feedbackNyayaTech.slice(1),
                  onChange: (e) => setFeedbackNyayaTech(e.target.value)
                }
              )
            ] }),
            errors["review.0.feedback"] && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors["review.0.feedback"] }),
            /* @__PURE__ */ jsxs("div", { className: "border border-gray-300 p-3", children: [
              /* @__PURE__ */ jsxs("h5", { className: "text-md font-medium", children: [
                " ",
                "Suggestions for improvement"
              ] }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  className: "border-0  border-gray-300 h-16 resize-none px-1 py-1 ",
                  placeholder: "Your feedback",
                  value: suggestionNyayaTech.charAt(0).toUpperCase() + suggestionNyayaTech.slice(1),
                  onChange: (e) => setSuggestionNyayaTech(e.target.value)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-x-2 flex justify-end ", children: /* @__PURE__ */ jsx(
            Button,
            {
              className: "rounded-none text-white text-sm bg-black h-8 py-2 px-5 font-normal hover:bg-black",
              onClick: handleSubmit,
              disabled: isPending || !ratingNyayaTech || !feedbackNyayaTech,
              children: isPending ? "Submitting..." : "Submit"
            }
          ) })
        ] })
      ] }) })
    ] }),
    showSuccessPopup && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 justify-center h-screen", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SubmitCaseIcon, {}) }),
      /* @__PURE__ */ jsx("div", { className: "text-3xl 3xl:text-6xl text-green-600", children: "Done" }),
      /* @__PURE__ */ jsxs("div", { className: "text-center space-y-1", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xl 3xl:text-2xl font-medium", children: "Thank You For Submitting Your Review!" }),
        /* @__PURE__ */ jsx("div", { className: "text-sm", children: "Your feedback has been successfully submitted" })
      ] })
    ] })
  ] });
};
const SplitComponent = UserReview;
export {
  SplitComponent as component
};
