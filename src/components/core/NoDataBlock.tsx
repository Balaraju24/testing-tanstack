import NoCasesData from "@/components/icons/no-cases-data";
import { NoDataDisplayProps } from "@/lib/interfaces/core";
import { useNavigate } from "@tanstack/react-router";
import { useUserDetails } from "../../utils/hooks/useUserPermissions";
import { ROUTE_MAP } from "@/lib/constants/noDataConstants";

const NoDataDisplay = ({
  title,
  description,
  showIcon = true,
  height = "h-[calc(100vh-200px)]",
  hasSearch = false,
  isOnHold = false,
  onHoldMessage,
  show = false,
}: NoDataDisplayProps) => {
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
    return canNavigate ? `Navigate to ${title.toLowerCase()} page` : undefined;
  };

  return (
    <div
      className={`flex flex-col ${height} justify-center items-center ${
        canNavigate ? "cursor-pointer" : ""
      }`}
      role="alert"
      aria-live="polite"
      onClick={handleClick}
    >
      {showIcon && <NoCasesData className="!p-0 !m-0" />}
      <div className="text-center">
        <h2 className="text-base font-normal text-gray-700">{getTitle()}</h2>
        <p
          className={`text-gray-500 ${
            hasCreateAccess ? "cursor-pointer hover:underline" : ""
          }`}
          aria-label={getAriaLabel()}
        >
          {getDescription()}
          {isOnHold && (
            <span className="text-red-500 font-medium ml-1">on hold</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default NoDataDisplay;
