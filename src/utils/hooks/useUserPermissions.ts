import { userStore } from "@/store/userDetails";
import { useStore } from "@tanstack/react-store";

// Custom hook for user details
export const useUserDetails = () => {
  const userDetails = useStore(userStore, (state: any) => state["user"]);
  const userType = userDetails?.user_type;

  const isManager = () => userType == "MANAGER";
  const isAdvocate = () => userType === "ADVOCATE";
  const isUser = () => userType === "CUSTOMER";
  const isAdmin = () => userType === "ADMIN";

  const getUserPermissions = () => {
    switch (userType) {
      case "MANAGER":
      case "ADVOCATE":
      case "CUSTOMER":
      case "ADMIN":
        return true;
      default:
        return [];
    }
  };

  return {
    isManager,
    isAdvocate,
    isUser,
    getUserPermissions,
    isAdmin,
  };
};
