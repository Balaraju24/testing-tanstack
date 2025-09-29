// hooks/useCaseNavigation.js
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";

export const useCaseNavigation = (record) => {
  const router = useRouter();
  const navigate = useNavigate();
  const { isUser } = useUserDetails();
  
  const case_id = record?.id;
  const serviceType = record?.service_type;
  const isLitigation = serviceType === "Litigation";

  const setCaseOrigin = () => {
    const origin = serviceType !== "Litigation" ? "legal-opinion" : "litigation";
    sessionStorage.setItem("case-origin", origin);
  };

  const getServiceBasePath = () => {
    return isLitigation ? `/litigations/service/${case_id}` : `/legal-opinion/service/${case_id}`;
  };

  const navigateToCaseHistory = () => {
    router.navigate({
      to: `${getServiceBasePath()}/case-history`,
    });
  };

  const navigateToNotes = () => {
    router.navigate({
      to: `${getServiceBasePath()}/notes`,
    });
  };

  const navigateToChat = () => {
    router.navigate({
      to: `${getServiceBasePath()}/chat`,
    });
  };

  const navigateToFiles = () => {
    router.navigate({
      to: `${getServiceBasePath()}/files`,
    });
  };

  const navigateToTodos = () => {
    sessionStorage.setItem("openTodoSheet", "true");
    if (isLitigation) {
      navigateToCaseHistory();
    } else {
      navigateToNotes();
    }
  };

  const navigateToView = () => {
    setCaseOrigin();
    if (isLitigation) {
      navigateToCaseHistory();
    } else {
      navigateToNotes();
    }
  };

  const navigateToManage = () => {
    setCaseOrigin();
    const userPath = isUser() ? "/user/manage" : "/manage";
    
    if (isLitigation) {
      navigate({
        to: `/litigations/service/${record?.id}${userPath}`,
      });
    } else {
      navigate({
        to: `/legal-opinion/service/${record?.id}${userPath}`,
      });
    }
  };

  return {
    navigateToCaseHistory,
    navigateToNotes,
    navigateToChat,
    navigateToFiles,
    navigateToTodos,
    navigateToView,
    navigateToManage,
    isLitigation,
  };
};