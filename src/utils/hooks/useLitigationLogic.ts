// hooks/useLitigationLogic.ts
import { getOrganizationListAPI } from "@/http/services/legalOpinion";
import {
  createLitigationAPI,
  createManagerLitigationAPI,
  getLitigationAPI,
} from "@/http/services/litigations";
import { LitigationService, StepType } from "@/lib/interfaces/litigation";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "./useDebounceHook";

export const useLitigationLogic = () => {
  const [selectedService, setSelectedService] =
    useState<LitigationService | null>(null);
  const [selectedIssueType, setSelectedIssueType] = useState<string | null>(
    null
  );
  const [selectedSubIssue, setSelectedSubIssue] =
    useState<LitigationService | null>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<StepType>("issue");
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce search term with 500ms delay
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const navigate = useNavigate();
  const { isManager, isAdmin } = useUserDetails();

  // Litigation services query
  const { isLoading, data: litigationServices } = useQuery({
    queryKey: ["litigation-services"],
    queryFn: async () => {
      const response = await getLitigationAPI({ category: "Litigation" });
      if (response.status === 200 || response.status === 201) {
        return response?.data?.data;
      }
      return [];
    },
    refetchOnWindowFocus: false,
  });

  // Organizations infinite query (UPDATED - uses debouncedSearchTerm)
  const {
    data: organisationData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isOrganizationLoading,
  } = useInfiniteQuery({
    queryKey: ["organisation-list", debouncedSearchTerm],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await getOrganizationListAPI({
        page: pageParam,
        page_size: 9,
        search_string: debouncedSearchTerm || undefined,
      });
      if (response?.status === 200 || response?.status === 201) {
        const paginationInfo = response?.data?.data?.pagination_info;
        return {
          data: response?.data?.data?.records || [],
          currentPage: paginationInfo?.current_page || pageParam,
          hasMore: paginationInfo?.next_page !== null,
          totalPages: paginationInfo?.total_pages || 1,
          nextPage: paginationInfo?.next_page,
        };
      }
      return {
        data: [],
        currentPage: pageParam,
        hasMore: false,
        totalPages: 1,
        nextPage: null,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.nextPage,
    enabled: isManager() || isAdmin(),
    refetchOnWindowFocus: false,
  });

  // Create litigation mutation
  const { mutate: createLitigationService, isPending } = useMutation({
    mutationFn: async (payload: {
      service_id: number;
      pro_code: string;
      case_type_acrym: string;
      location_id?: number;
      organisation_name?: string;
      user_id?: number;
    }) => {
      if (
        (isManager() || isAdmin()) &&
        payload.location_id &&
        payload.organisation_name &&
        payload.user_id
      ) {
        const managerPayload = {
          service_id: payload.service_id,
          pro_code: payload.pro_code,
          case_type_acrym: payload.case_type_acrym,
          location_id: payload.location_id,
          organisation_name: payload.organisation_name,
          user_id: payload.user_id,
        };
        return await createManagerLitigationAPI(managerPayload);
      } else {
        const userPayload = {
          service_id: payload.service_id,
          pro_code: payload.pro_code,
          case_type_acrym: payload.case_type_acrym,
        };
        return await createLitigationAPI(userPayload);
      }
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      navigate({ to: "/litigations" });
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong.");
    },
  });

  // Utility functions
  const getAcronym = (text: string) => {
    const words = text.split(/\s+/);
    if (words.length < 2) return text.slice(0, 2).toUpperCase();
    return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
  };

  const getMainIssues = () => {
    if (!litigationServices) return [];
    const uniqueIssues = litigationServices.reduce(
      (acc: any[], current: LitigationService) => {
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

  const getIssueTypes = (selectedIssue: string) => {
    if (!litigationServices) return [];
    const issueTypes = litigationServices
      .filter(
        (service: LitigationService) =>
          service.issue === selectedIssue && service.issue_type
      )
      .reduce((acc: string[], current: LitigationService) => {
        if (current.issue_type && !acc.includes(current.issue_type)) {
          acc.push(current.issue_type);
        }
        return acc;
      }, []);
    return issueTypes.slice(0, 4);
  };

  const getSubIssues = (selectedIssue: string, selectedIssueType: string) => {
    if (!litigationServices) return [];
    return litigationServices.filter(
      (service: LitigationService) =>
        service.issue === selectedIssue &&
        service.issue_type === selectedIssueType &&
        service.sub_issue
    );
  };

  const getOrganizations = () => {
    if (!organisationData?.pages) return [];
    return organisationData.pages.flatMap((page: any) => page.data);
  };

  // Step navigation
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
      return (
        selectedSubIssue && (!isManager() || !isAdmin() || selectedOrganization)
      );
    }
    return (
      selectedService && (!isManager() || !isAdmin() || selectedOrganization)
    );
  };

  // Event handlers
  const handleServiceClick = (litigation: LitigationService) => {
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

  const handleIssueTypeClick = (issueType: string) => {
    setSelectedIssueType(issueType);
    setSelectedSubIssue(null);
    setSelectedOrganization(null);
    setCurrentStep("subIssue");
  };

  const handleSubIssueClick = (subIssue: LitigationService) => {
    setSelectedSubIssue(subIssue);
    setSelectedOrganization(null);
    if (isManager() || isAdmin()) {
      setCurrentStep("organization");
    }
  };

  const handleOrganizationSelect = (org: any) => {
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
      ...((isManager() || isAdmin()) &&
        selectedOrganization && {
          location_id:
            selectedOrganization.location_id ||
            selectedOrganization.location.id,
          organisation_name: selectedOrganization.organisation_name,
          user_id: selectedOrganization.id,
        }),
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
    setSearchTerm,
  };
};
