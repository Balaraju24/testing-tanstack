import { jsxs, jsx } from "react/jsx-runtime";
import { N as NoCasesData } from "./no-cases-data-B3QWVZUO.js";
import { useNavigate } from "@tanstack/react-router";
import { u as useUserDetails } from "./useUserPermissions-IrViIWLA.js";
import { R as ROUTE_MAP } from "./noDataConstants-CAKRQRCT.js";
const NoDataDisplay = ({
  title,
  description,
  showIcon = true,
  height = "h-[calc(100vh-200px)]",
  hasSearch = false,
  isOnHold = false,
  onHoldMessage,
  show = false
}) => {
  const navigate = useNavigate();
  const { isUser, isManager, isAdmin, isAdvocate } = useUserDetails();
  const hasPermission = isUser() || isManager();
  const hasCreateAccess = isManager() && title;
  const canNavigate = hasPermission && title && ROUTE_MAP[title];
  const getTitle = () => {
    if (show) return "";
    return title ? `No ${title} Found` : "No Data Available";
  };
  const getDescription = () => {
    if (isOnHold && onHoldMessage) return onHoldMessage;
    if (hasSearch) return "Try adjusting your search criteria or filters";
    if (!isAdvocate() && !isAdmin() && description) return description;
    return "";
  };
  const handleClick = () => {
    if (canNavigate) {
      navigate({ to: ROUTE_MAP[title] });
    }
  };
  const getAriaLabel = () => {
    return canNavigate ? `Navigate to ${title.toLowerCase()} page` : void 0;
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex flex-col ${height} justify-center items-center ${canNavigate ? "cursor-pointer" : ""}`,
      role: "alert",
      "aria-live": "polite",
      onClick: handleClick,
      children: [
        showIcon && /* @__PURE__ */ jsx(NoCasesData, { className: "!p-0 !m-0" }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-base font-normal text-gray-700", children: getTitle() }),
          /* @__PURE__ */ jsxs(
            "p",
            {
              className: `text-gray-500 ${hasCreateAccess ? "cursor-pointer hover:underline" : ""}`,
              "aria-label": getAriaLabel(),
              children: [
                getDescription(),
                isOnHold && /* @__PURE__ */ jsx("span", { className: "text-red-500 font-medium ml-1", children: "on hold" })
              ]
            }
          )
        ] })
      ]
    }
  );
};
export {
  NoDataDisplay as N
};
