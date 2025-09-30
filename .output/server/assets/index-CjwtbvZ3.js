import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { L as LoadingComponent } from "./Loading-DQypZbMn.js";
import { g as getOrganizationListAPI } from "./legalOpinion-qNiAW4Gj.js";
import { c as getLitigationAPI, d as createManagerLitigationAPI, e as createLitigationAPI } from "./litigations-2Q1m8RsY.js";
import { u as useUserDetails } from "./useUserPermissions-IrViIWLA.js";
import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { i as issueIcons, g as getIssueIcon } from "./litigation-b6202F6J.js";
import { Loader2, Search, X, ArrowLeftIcon } from "lucide-react";
import { B as Button } from "./router-e7zdrxGz.js";
import "./fetch-Cpm1bFFM.js";
import "js-cookie";
import "./userDetails-Dbr9T6uw.js";
import "@tanstack/react-store";
import "./legal-notice-icon-ivaufGCR.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "react-error-boundary";
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
const useLitigationLogic = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedIssueType, setSelectedIssueType] = useState(
    null
  );
  const [selectedSubIssue, setSelectedSubIssue] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [currentStep, setCurrentStep] = useState("issue");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();
  const { isManager, isAdmin } = useUserDetails();
  const { isLoading, data: litigationServices } = useQuery({
    queryKey: ["litigation-services"],
    queryFn: async () => {
      const response = await getLitigationAPI({ category: "Litigation" });
      if (response.status === 200 || response.status === 201) {
        return response?.data?.data;
      }
      return [];
    },
    refetchOnWindowFocus: false
  });
  const {
    data: organisationData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isOrganizationLoading
  } = useInfiniteQuery({
    queryKey: ["organisation-list", debouncedSearchTerm],
    queryFn: async ({ pageParam }) => {
      const response = await getOrganizationListAPI({
        page: pageParam,
        page_size: 9,
        search_string: debouncedSearchTerm || void 0
      });
      if (response?.status === 200 || response?.status === 201) {
        const paginationInfo = response?.data?.data?.pagination_info;
        return {
          data: response?.data?.data?.records || [],
          currentPage: paginationInfo?.current_page || pageParam,
          hasMore: paginationInfo?.next_page !== null,
          totalPages: paginationInfo?.total_pages || 1,
          nextPage: paginationInfo?.next_page
        };
      }
      return {
        data: [],
        currentPage: pageParam,
        hasMore: false,
        totalPages: 1,
        nextPage: null
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: isManager() || isAdmin(),
    refetchOnWindowFocus: false
  });
  const { mutate: createLitigationService, isPending } = useMutation({
    mutationFn: async (payload) => {
      if ((isManager() || isAdmin()) && payload.location_id && payload.organisation_name && payload.user_id) {
        const managerPayload = {
          service_id: payload.service_id,
          pro_code: payload.pro_code,
          case_type_acrym: payload.case_type_acrym,
          location_id: payload.location_id,
          organisation_name: payload.organisation_name,
          user_id: payload.user_id
        };
        return await createManagerLitigationAPI(managerPayload);
      } else {
        const userPayload = {
          service_id: payload.service_id,
          pro_code: payload.pro_code,
          case_type_acrym: payload.case_type_acrym
        };
        return await createLitigationAPI(userPayload);
      }
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      navigate({ to: "/litigations" });
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong.");
    }
  });
  const getAcronym = (text) => {
    const words = text.split(/\s+/);
    if (words.length < 2) return text.slice(0, 2).toUpperCase();
    return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
  };
  const getMainIssues = () => {
    if (!litigationServices) return [];
    const uniqueIssues = litigationServices.reduce(
      (acc, current) => {
        const existingIssue = acc.find((item) => item.issue === current.issue);
        if (!existingIssue) {
          acc.push(current);
        }
        return acc;
      },
      []
    );
    return uniqueIssues.slice(0, 6);
  };
  const getIssueTypes = (selectedIssue) => {
    if (!litigationServices) return [];
    const issueTypes = litigationServices.filter(
      (service) => service.issue === selectedIssue && service.issue_type
    ).reduce((acc, current) => {
      if (current.issue_type && !acc.includes(current.issue_type)) {
        acc.push(current.issue_type);
      }
      return acc;
    }, []);
    return issueTypes.slice(0, 4);
  };
  const getSubIssues = (selectedIssue, selectedIssueType2) => {
    if (!litigationServices) return [];
    return litigationServices.filter(
      (service) => service.issue === selectedIssue && service.issue_type === selectedIssueType2 && service.sub_issue
    );
  };
  const getOrganizations = () => {
    if (!organisationData?.pages) return [];
    return organisationData.pages.flatMap((page) => page.data);
  };
  const getCurrentStep = () => {
    switch (currentStep) {
      case "issue":
        return 1;
      case "issueType":
        return 2;
      case "subIssue":
        return 3;
      case "organization":
        return selectedService?.issue === "Notices" ? 4 : 2;
      default:
        return 1;
    }
  };
  const getTotalSteps = () => {
    if (selectedService?.issue === "Notices") {
      return isManager() || isAdmin() ? 4 : 3;
    }
    return isManager() || isAdmin() ? 2 : 1;
  };
  const getStepTitle = () => {
    switch (currentStep) {
      case "issue":
        return "Select a Litigation";
      case "issueType":
        return "Select Issue Type";
      case "subIssue":
        return "Select Sub Issue";
      case "organization":
        return "Select Organization";
      default:
        return "Select a Litigation";
    }
  };
  const canSubmit = () => {
    if (currentStep === "organization") {
      return selectedOrganization;
    }
    if (selectedService?.issue === "Notices") {
      return selectedSubIssue && (!isManager() || !isAdmin() || selectedOrganization);
    }
    return selectedService && (!isManager() || !isAdmin() || selectedOrganization);
  };
  const handleServiceClick = (litigation) => {
    setSelectedService(litigation);
    setSelectedIssueType(null);
    setSelectedSubIssue(null);
    setSelectedOrganization(null);
    if (litigation.issue === "Notices") {
      setCurrentStep("issueType");
    } else if (isManager() || isAdmin()) {
      setCurrentStep("organization");
    }
  };
  const handleIssueTypeClick = (issueType) => {
    setSelectedIssueType(issueType);
    setSelectedSubIssue(null);
    setSelectedOrganization(null);
    setCurrentStep("subIssue");
  };
  const handleSubIssueClick = (subIssue) => {
    setSelectedSubIssue(subIssue);
    setSelectedOrganization(null);
    if (isManager() || isAdmin()) {
      setCurrentStep("organization");
    }
  };
  const handleOrganizationSelect = (org) => {
    setSelectedOrganization(org);
  };
  const handleBackClick = () => {
    switch (currentStep) {
      case "issueType":
        setCurrentStep("issue");
        setSelectedService(null);
        setSelectedIssueType(null);
        setSelectedSubIssue(null);
        setSearchTerm("");
        setSelectedOrganization(null);
        break;
      case "subIssue":
        setCurrentStep("issueType");
        setSelectedSubIssue(null);
        setSearchTerm("");
        setSelectedOrganization(null);
        break;
      case "organization":
        if (selectedService?.issue === "Notices" && selectedIssueType) {
          setCurrentStep("subIssue");
          setSearchTerm("");
        } else {
          setCurrentStep("issue");
          setSearchTerm("");
        }
        setSelectedOrganization(null);
        break;
      default:
        navigate({ to: "/litigations" });
    }
  };
  const handleSubmit = () => {
    let finalService = selectedService;
    if (selectedService?.issue === "Notices" && selectedSubIssue) {
      finalService = selectedSubIssue;
    }
    if (!finalService) {
      toast.error("Please select a litigation type.");
      return;
    }
    if ((isManager() || isAdmin()) && !selectedOrganization) {
      toast.error("Please select an organization.");
      return;
    }
    const payload = {
      service_id: finalService.id,
      pro_code: finalService.pro_code,
      case_type_acrym: getAcronym(finalService.sub_issue || finalService.issue),
      ...(isManager() || isAdmin()) && selectedOrganization && {
        location_id: selectedOrganization.location_id || selectedOrganization.location.id,
        organisation_name: selectedOrganization.organisation_name,
        user_id: selectedOrganization.id
      }
    };
    createLitigationService(payload);
  };
  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  return {
    // State
    selectedService,
    selectedIssueType,
    selectedSubIssue,
    selectedOrganization,
    currentStep,
    searchTerm,
    debouncedSearchTerm,
    // Loading states
    isLoading,
    isOrganizationLoading,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    // User permissions
    isManager: isManager(),
    isAdmin: isAdmin(),
    // Data getters
    getMainIssues,
    getIssueTypes,
    getSubIssues,
    getOrganizations,
    // Step helpers
    getCurrentStep,
    getTotalSteps,
    getStepTitle,
    canSubmit,
    // Event handlers
    handleServiceClick,
    handleIssueTypeClick,
    handleSubIssueClick,
    handleOrganizationSelect,
    handleBackClick,
    handleSubmit,
    handleLoadMore,
    setSearchTerm
  };
};
const IssueGrid = ({
  issues,
  selectedIssue,
  onIssueSelect
}) => {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-2 gap-4", children: issues.map((litigation, index) => {
    const isSelected = selectedIssue?.id === litigation.id;
    const icon = issueIcons[litigation.issue]?.({
      className: `h-7 w-7 ${isSelected ? "text-white" : "text-black"}`
    }) ?? /* @__PURE__ */ jsx("span", { role: "img", "aria-label": "icon", className: "text-xl", children: "📄" });
    return /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => onIssueSelect(litigation),
        className: `p-2 max-w-72 cursor-pointer transition-all duration-200 ${isSelected ? "bg-black text-white" : "bg-white hover:bg-gray-50"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: icon }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-[40px] flex flex-col justify-center", children: /* @__PURE__ */ jsx("div", { className: "font-normal text-base 2xl:text-lg uppercase leading-relaxed", children: litigation.issue }) })
        ] })
      },
      index
    );
  }) });
};
const IssueTypeGrid = ({
  issueTypes,
  selectedIssueType,
  onIssueTypeSelect
}) => {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: issueTypes.map((issueType, index) => {
    const isSelected = selectedIssueType === issueType;
    const IconComponent = getIssueIcon(issueType);
    const icon = IconComponent ? /* @__PURE__ */ jsx(
      IconComponent,
      {
        className: `h-6 w-6 ${isSelected ? "text-white" : "text-black"}`
      }
    ) : /* @__PURE__ */ jsx("span", { role: "img", "aria-label": "icon", className: "text-xl", children: "📋" });
    return /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => onIssueTypeSelect(issueType),
        className: `p-2 max-w-96 cursor-pointer transition-all duration-200 ${isSelected ? "bg-black text-white" : "bg-white hover:bg-gray-50"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: icon }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-[40px] flex flex-col justify-center", children: /* @__PURE__ */ jsx("div", { className: "font-normal text-base 2xl:text-lg uppercase leading-relaxed", children: issueType }) })
        ] })
      },
      index
    );
  }) });
};
function NoOrganizationIcon({
  className
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      id: "Layer_1",
      height: "512",
      viewBox: "0 0 64 64",
      width: "512",
      xmlns: "http://www.w3.org/2000/svg",
      "data-name": "Layer 1",
      className,
      children: [
        /* @__PURE__ */ jsx("path", { d: "m11 33v10h2v-9h10v7h2v-18h14v18h2v-7h10v9h2v-10a1 1 0 0 0 -1-1h-11v-10a1 1 0 0 0 -1-1h-16a1 1 0 0 0 -1 1v10h-11a1 1 0 0 0 -1 1z" }),
        /* @__PURE__ */ jsx("path", { d: "m55.2 51.2a3.5 3.5 0 1 0 -4.4 0 4 4 0 0 0 -1.66 1 5 5 0 0 0 -2.78-2 4 4 0 1 0 -4.72 0 5.09 5.09 0 0 0 -1.9 1 6 6 0 0 0 -4.86-4.17 5 5 0 1 0 -5.76 0 6 6 0 0 0 -4.86 4.17 5.09 5.09 0 0 0 -1.9-1 4 4 0 1 0 -4.72 0 5 5 0 0 0 -2.78 2 4 4 0 0 0 -1.66-1 3.5 3.5 0 1 0 -4.4 0 4 4 0 0 0 -2.8 3.8v5a1 1 0 0 0 1 1h7a1 1 0 0 0 1 1h9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1h9a1 1 0 0 0 1-1h7a1 1 0 0 0 1-1v-5a4 4 0 0 0 -2.8-3.8zm-44.2-4.2a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5-1.5zm3 12h-6v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm6-14a2 2 0 1 1 -2 2 2 2 0 0 1 2-2zm4 15h-8v-5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3zm5-17a3 3 0 1 1 3 3 3 3 0 0 1 -3-3zm9 18h-12v-8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4zm6-16a2 2 0 1 1 -2 2 2 2 0 0 1 2-2zm4 15h-8v-5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3zm5-13a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5-1.5zm3 12h-6v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2z" }),
        /* @__PURE__ */ jsx("path", { d: "m27.5 26h3v3h-3z" }),
        /* @__PURE__ */ jsx("path", { d: "m33.5 26h3v3h-3z" }),
        /* @__PURE__ */ jsx("path", { d: "m27.5 32h3v3h-3z" }),
        /* @__PURE__ */ jsx("path", { d: "m33.5 32h3v3h-3z" }),
        /* @__PURE__ */ jsx("path", { d: "m43 37h2v2h-2z" }),
        /* @__PURE__ */ jsx("path", { d: "m47 37h2v2h-2z" }),
        /* @__PURE__ */ jsx("path", { d: "m15 37h2v2h-2z" }),
        /* @__PURE__ */ jsx("path", { d: "m19 37h2v2h-2z" }),
        /* @__PURE__ */ jsx("path", { d: "m32 12a18 18 0 0 1 18 18h2a20 20 0 0 0 -40 0h2a18 18 0 0 1 18-18z" }),
        /* @__PURE__ */ jsx("path", { d: "m60.44 23.7-1.72-5.31a1.92 1.92 0 0 0 -.94-1.13 2 2 0 0 0 -1.5-.12l-2.12.73a22.13 22.13 0 0 0 -3.78-5.11l1.36-1.88a2 2 0 0 0 -.43-2.7l-4.53-3.29a1.94 1.94 0 0 0 -2.7.43l-1.28 1.84a22.79 22.79 0 0 0 -6.07-1.92v-2.31a1.94 1.94 0 0 0 -1.93-1.93h-5.6a1.94 1.94 0 0 0 -1.93 1.93v2.24a22.78 22.78 0 0 0 -6 2l-1.35-1.84a1.93 1.93 0 0 0 -2.7-.44l-4.53 3.3a2 2 0 0 0 -.43 2.7l1.35 1.78a22.46 22.46 0 0 0 -3.69 5.18l-2.2-.71a2 2 0 0 0 -1.5.12 1.89 1.89 0 0 0 -.93 1.11l-1.73 5.33a1.93 1.93 0 0 0 1.23 2.44l2.15.65a25 25 0 0 0 -.21 3.21 17.32 17.32 0 0 0 .27 3.15l-2.2.71a1.93 1.93 0 0 0 -1.24 2.44l1.73 5.33 1.9-.63-1.78-5.24 2.2-.71a1.93 1.93 0 0 0 1.31-2.05 23 23 0 0 1 0-5.9 1.93 1.93 0 0 0 -1.31-2.1l-2.15-.63 1.71-5.26 2.13.69a1.94 1.94 0 0 0 2.3-.92 22.79 22.79 0 0 1 3.47-4.88 1.94 1.94 0 0 0 .17-2.46l-1.37-1.74 4.43-3.3 1.36 1.87a1.93 1.93 0 0 0 2.4.59 23.84 23.84 0 0 1 5.62-1.83 1.92 1.92 0 0 0 1.59-1.89l-.07-2.24 5.53-.07v2.31a1.92 1.92 0 0 0 1.58 1.89 23.55 23.55 0 0 1 5.62 1.87 1.94 1.94 0 0 0 2.41-.59l1.26-1.9 4.52 3.2-1.36 1.87a2 2 0 0 0 .17 2.47 22.47 22.47 0 0 1 3.47 4.78 1.94 1.94 0 0 0 2.3.92l2.13-.69 1.76 5.18-2.2.71a1.93 1.93 0 0 0 -1.31 2.1 23 23 0 0 1 0 5.9 1.93 1.93 0 0 0 1.31 2.1l2.15.63-1.73 5.32 1.9.62 1.73-5.33a1.93 1.93 0 0 0 -1.23-2.44l-2.15-.65a25 25 0 0 0 .21-3.2 17.32 17.32 0 0 0 -.27-3.15l2.2-.71a1.93 1.93 0 0 0 1.24-2.44z" })
      ]
    }
  );
}
function OrganizationIcon({
  className
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "26",
      height: "27",
      viewBox: "0 0 26 27",
      className,
      fill: "none",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M7.6763 11.5372C7.97323 11.5372 8.21392 11.2965 8.21392 10.9995C8.21392 10.7026 7.97323 10.4619 7.6763 10.4619C7.37936 10.4619 7.13867 10.7026 7.13867 10.9995C7.13867 11.2965 7.37936 11.5372 7.6763 11.5372Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx("path", { fill: "currentColor" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M6.38608 26.9199C6.38033 26.9208 6.37452 26.9215 6.36914 26.9222C6.37395 26.9216 6.37964 26.9209 6.38608 26.9199Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M1.73333 9.24968H4.33333V16.2499H2.6C2.37015 16.2499 2.14971 16.3421 1.98717 16.5062C1.82464 16.6702 1.73333 16.8928 1.73333 17.1249C1.73333 17.357 1.82464 17.5795 1.98717 17.7436C2.14971 17.9077 2.37015 17.9999 2.6 17.9999H23.4C23.6299 17.9999 23.8503 17.9077 24.0128 17.7436C24.1754 17.5795 24.2667 17.357 24.2667 17.1249C24.2667 16.8928 24.1754 16.6702 24.0128 16.5062C23.8503 16.3421 23.6299 16.2499 23.4 16.2499H21.6667V9.24968H24.2667C24.4552 9.24949 24.6386 9.18721 24.7889 9.07228C24.9393 8.95736 25.0484 8.79607 25.0997 8.61287C25.1511 8.42967 25.1418 8.23457 25.0734 8.05716C25.005 7.87974 24.8811 7.7297 24.7206 7.6298L13.4539 0.629615C13.3174 0.544867 13.1603 0.5 13 0.5C12.8397 0.5 12.6826 0.544867 12.5461 0.629615L1.27942 7.6298C1.1189 7.7297 0.99503 7.87974 0.926608 8.05716C0.858185 8.23457 0.84894 8.42967 0.900274 8.61287C0.951609 8.79607 1.06072 8.95736 1.21106 9.07228C1.3614 9.18721 1.54476 9.24949 1.73333 9.24968ZM6.06667 9.24968H9.53333V16.2499H6.06667V9.24968ZM14.7333 9.24968V16.2499H11.2667V9.24968H14.7333ZM19.9333 16.2499H16.4667V9.24968H19.9333V16.2499ZM13 2.40154L21.2052 7.49964H4.79483L13 2.40154ZM26 20.625C26 20.857 25.9087 21.0796 25.7462 21.2437C25.5836 21.4078 25.3632 21.5 25.1333 21.5H0.866667C0.636812 21.5 0.416372 21.4078 0.253841 21.2437C0.0913092 21.0796 0 20.857 0 20.625C0 20.3929 0.0913092 20.1703 0.253841 20.0062C0.416372 19.8421 0.636812 19.75 0.866667 19.75H25.1333C25.3632 19.75 25.5836 19.8421 25.7462 20.0062C25.9087 20.1703 26 20.3929 26 20.625Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
}
const OrganizationGrid = ({
  organizations,
  selectedOrganization,
  onOrganizationSelect,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  searchTerm
}) => {
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex max-w-5xl h-[calc(100vh-400px)] overflow-hidden justify-center items-center py-8 text-center self-center ", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "animate-spin h-6 w-6 text-gray-500" }),
      /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-500", children: "Loading organizations..." })
    ] });
  }
  if (organizations.length === 0 && searchTerm.length > 0) {
    return /* @__PURE__ */ jsx("div", { className: "flex max-w-5xl h-[calc(100vh-400px)] overflow-hidden justify-center items-center py-8 text-center self-center ", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col  py-12", children: [
      /* @__PURE__ */ jsx(NoOrganizationIcon, { className: "h-40 w-40 text-gray-400 mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg font-normal", children: "No organizations found" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 mb-8", children: organizations.map((org, index) => {
      const isSelected = selectedOrganization?.id === org.id;
      return /* @__PURE__ */ jsx(
        "div",
        {
          onClick: () => onOrganizationSelect(org),
          className: `p-2 max-w-72 cursor-pointer transition-all duration-200 ${isSelected ? "bg-black text-white" : "bg-white hover:bg-gray-50"}`,
          children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxs("div", { className: "font-normal text-base 2xl:text-lg flex justify-center uppercase leading-relaxed", children: [
            /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
              OrganizationIcon,
              {
                className: `h-6 w-6 mx-3 mt-1 ${isSelected ? "text-white" : "text-gray-800"}`
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { children: [
              " ",
              org.organisation_name
            ] })
          ] }) })
        },
        index
      );
    }) }),
    hasNextPage && /* @__PURE__ */ jsx("div", { className: "flex max-w-5xl justify-center mb-8", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onLoadMore,
        disabled: isFetchingNextPage,
        className: "px-6 py-2 text-sm border cursor-pointer border-gray-300 text-gray-700 bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        children: isFetchingNextPage ? /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(Loader2, { className: "animate-spin h-4 w-4 mr-2" }),
          "Loading..."
        ] }) : "Load More"
      }
    ) })
  ] });
};
const SearchInput = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search..."
}) => {
  const handleClear = () => {
    onSearchChange("");
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative w-80", children: [
    /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder,
        value: searchTerm,
        onChange: (e) => onSearchChange(e.target.value),
        className: "w-full pl-10 pr-10 py-2 text-xs border border-gray-300 bg-gray-100 placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-none focus:border-none"
      }
    ),
    searchTerm && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleClear,
        className: "absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors",
        type: "button",
        children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 cursor-pointer" })
      }
    )
  ] });
};
function MoveDownIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      children: [
        /* @__PURE__ */ jsx("path", { d: "M8 18L12 22L16 18" }),
        /* @__PURE__ */ jsx("path", { d: "M12 2V22" })
      ]
    }
  );
}
const StepHeader = ({
  onBackClick,
  currentStep,
  totalSteps,
  title,
  searchComponent
}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "p-1.5 px-2 border border-gray-300 rounded-none cursor-pointer hover:bg-gray-100 transition-colors",
          onClick: onBackClick,
          children: /* @__PURE__ */ jsx(ArrowLeftIcon, { className: "h-4 w-5 text-gray-600" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center pt-1 items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm 2xl:text-base font-normal", children: currentStep }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm 2xl:text-base text-yellow-600 font-light", children: [
          "Step ",
          currentStep,
          "/",
          totalSteps
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl flex items-center justify-between mt-16 mb-2", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-lg font-light text-yellow-600 gap-2 flex", children: [
        title,
        /* @__PURE__ */ jsx(MoveDownIcon, { className: "animate-bounce mt-1" })
      ] }),
      searchComponent && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: searchComponent })
    ] })
  ] });
};
const SubIssueGrid = ({
  subIssues,
  selectedSubIssue,
  onSubIssueSelect
}) => {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: subIssues.map((subIssue, index) => {
    const isSelected = selectedSubIssue?.id === subIssue.id;
    const IconComponent = getIssueIcon(subIssue.sub_issue || "");
    const icon = IconComponent ? /* @__PURE__ */ jsx(
      IconComponent,
      {
        className: `h-7 w-7 ${isSelected ? "text-white" : "text-black"}`
      }
    ) : /* @__PURE__ */ jsx("span", { role: "img", "aria-label": "icon", className: "text-xl", children: "📑" });
    return /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => onSubIssueSelect(subIssue),
        className: `p-2 max-w-full cursor-pointer transition-all duration-200 ${isSelected ? "bg-black text-white" : "bg-white hover:bg-gray-50"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: icon }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-[40px] flex flex-col justify-center", children: /* @__PURE__ */ jsx("div", { className: "font-normal text-base 2xl:text-lg uppercase leading-relaxed", children: subIssue.sub_issue }) })
        ] })
      },
      index
    );
  }) });
};
const SubmitButtonComponent = ({
  canSubmit,
  isPending,
  onSubmit
}) => {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-end max-w-2xl mx-auto", children: /* @__PURE__ */ jsx(
    Button,
    {
      className: "px-6 py-2 bg-black text-white cursor-pointer rounded-none hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
      disabled: !canSubmit || isPending,
      onClick: onSubmit,
      children: isPending ? /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        "Submitting... ",
        /* @__PURE__ */ jsx(Loader2, { className: "animate-spin h-4 w-4 ml-2" })
      ] }) : "Submit"
    }
  ) });
};
const CreateLitigation = () => {
  const {
    selectedService,
    selectedIssueType,
    selectedSubIssue,
    selectedOrganization,
    currentStep,
    searchTerm,
    debouncedSearchTerm,
    isLoading,
    isOrganizationLoading,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    isManager,
    isAdmin,
    getMainIssues,
    getIssueTypes,
    getSubIssues,
    getOrganizations,
    getCurrentStep,
    getTotalSteps,
    getStepTitle,
    canSubmit,
    handleServiceClick,
    handleIssueTypeClick,
    handleSubIssueClick,
    handleOrganizationSelect,
    handleBackClick,
    handleSubmit,
    handleLoadMore,
    setSearchTerm
  } = useLitigationLogic();
  const showSubmitButton = currentStep === "organization" && selectedOrganization || currentStep === "issue" && selectedService && selectedService.issue !== "Notices" && !isManager && !isAdmin || currentStep === "subIssue" && selectedSubIssue && !isManager && !isAdmin;
  const searchComponent = currentStep === "organization" && (isManager || isAdmin) ? /* @__PURE__ */ jsx(
    SearchInput,
    {
      searchTerm,
      onSearchChange: setSearchTerm,
      placeholder: "Search by organization"
    }
  ) : null;
  return /* @__PURE__ */ jsx("div", { className: "h-[calc(100vh-120px)] mt-10 py-6 px-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl xl:ml-16 mx-auto", children: isLoading ? /* @__PURE__ */ jsx(LoadingComponent, { loading: isLoading, message: "New Case..." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      StepHeader,
      {
        onBackClick: handleBackClick,
        currentStep: getCurrentStep(),
        totalSteps: getTotalSteps(),
        title: getStepTitle(),
        searchComponent
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: " mb-8 mt-4", children: [
      currentStep === "issue" && /* @__PURE__ */ jsx(
        IssueGrid,
        {
          issues: getMainIssues(),
          selectedIssue: selectedService,
          onIssueSelect: handleServiceClick
        }
      ),
      currentStep === "issueType" && selectedService && /* @__PURE__ */ jsx(
        IssueTypeGrid,
        {
          issueTypes: getIssueTypes(selectedService.issue),
          selectedIssueType,
          onIssueTypeSelect: handleIssueTypeClick
        }
      ),
      currentStep === "subIssue" && selectedService && selectedIssueType && /* @__PURE__ */ jsx(
        SubIssueGrid,
        {
          subIssues: getSubIssues(
            selectedService.issue,
            selectedIssueType
          ),
          selectedSubIssue,
          onSubIssueSelect: handleSubIssueClick,
          showChevron: isManager || isAdmin
        }
      ),
      currentStep === "organization" && (isManager || isAdmin) && /* @__PURE__ */ jsx(
        OrganizationGrid,
        {
          organizations: getOrganizations(),
          selectedOrganization,
          onOrganizationSelect: handleOrganizationSelect,
          isLoading: isOrganizationLoading,
          hasNextPage,
          isFetchingNextPage,
          onLoadMore: handleLoadMore,
          searchTerm: debouncedSearchTerm
        }
      )
    ] }),
    showSubmitButton && /* @__PURE__ */ jsx(
      SubmitButtonComponent,
      {
        canSubmit: canSubmit(),
        isPending,
        onSubmit: handleSubmit
      }
    )
  ] }) }) });
};
const SplitComponent = CreateLitigation;
export {
  SplitComponent as component
};
