import { u as userStore } from './userDetails-Dbr9T6uw.mjs';
import { useStore } from '@tanstack/react-store';

const useUserDetails = () => {
  const userDetails = useStore(userStore, (state) => state["user"]);
  const userType = userDetails == null ? void 0 : userDetails.user_type;
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
    isAdmin
  };
};

export { useUserDetails as u };
//# sourceMappingURL=useUserPermissions-IrViIWLA.mjs.map
