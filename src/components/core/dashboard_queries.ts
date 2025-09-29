import {
  advOrgDropDown,
  getAllLocations,
  orgsDropdown,
  OrgsStatsAPI,
  advLocDropdown,
} from "@/http/services/dashboard";
import { transformApiData } from "@/utils/helpers/transformOrgStatApi";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";

export const useLocations = ({
  search_string,
  enabled,
}: {
  search_string?: string | null;
  enabled?: boolean;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["locations", search_string],
    queryFn: async () => {
      const queryParams = {
        page: 1,
        page_size: 50,
        ...(search_string ? { search_string } : {}),
      };
      const response = await getAllLocations(queryParams);
      return response.data?.data;
    },
    enabled: enabled,
  });

  return { data, isLoading };
};

export const useOrganizationsStats = ({
  dateRange,
  organization,
  location,
}: {
  dateRange?: DateRange;
  organization?: string | null;
  location?: number | null;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["organizationsStats", dateRange, organization, location],
    refetchOnWindowFocus: false,

    queryFn: async () => {
      let queryParams = {};
      if (dateRange)
        queryParams = {
          from_date: dayjs(dateRange?.from).format("YYYY-MM-DD"),
          to_date: dayjs(dateRange?.to).format("YYYY-MM-DD"),
        };
      if (organization) queryParams = { ...queryParams, user_id: organization };
      if (location) queryParams = { ...queryParams, location_id: location };
      const response = await OrgsStatsAPI(queryParams);
      const data = response.data?.data;
      return transformApiData(data);
    },
  });

  return { data, isLoading };
};

export const useOrganizationDropdown = (
  search_string?: string,
  enabled?: boolean
) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orgsDropdown", search_string],
    queryFn: async () => {
      let queryparam = {};
      if (search_string) queryparam = { search_string: search_string };
      const response = await orgsDropdown({
        page: 1,
        page_size: 50,
        ...queryparam,
      });
      return response.data?.data;
    },
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading };
};

export const useAdvocateOrgDropdown = (enabled?: boolean) => {
  const { data, isLoading } = useQuery({
    queryKey: ["AdvOrgsDropdown"],
    queryFn: async () => {
      const response = await advOrgDropDown();
      return response.data?.data;
    },
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading };
};

export const useAdvocateLocationDropdown = (enabled?: boolean) => {
  const { data, isLoading } = useQuery({
    queryKey: ["AdvLocsDropdown"],
    queryFn: async () => {
      const response = await advLocDropdown();
      return response.data?.data;
    },
    enabled: enabled,
  });
  return { data, isLoading };
};
