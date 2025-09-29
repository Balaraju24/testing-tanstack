import React, { useEffect, useState } from "react";
import Stats from "./Stats";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ComboBox from "@/components/ui/combo-box";
import CustomDateRangePicker from "@/components/core/CustomDateRangePicker";
import { DateRange } from "react-day-picker";
import OrganizationStatistics from "./OrganizationStatistics";

import dayjs from "dayjs";
import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import {
  useLocations,
  useOrganizationDropdown,
} from "@/components/core/dashboard_queries";

interface SearchParams {
  from: string;
  to: string;
}

const RevenueStatistics = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const search: SearchParams = useSearch({
    strict: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const [searchLocation, setSearchLocation] = useState<string | null>(null);
  const [searchOrganizationString, setSearchOrganizationString] =
    useState<string>();
  const [searchOrganization, setSearchOrganization] = useState<string | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const { data: locationData, isLoading } = useLocations({
    search_string: searchLocation,
  });

  const location2 = locationData?.records?.map((location) => {
    return {
      id: location.id,
      label: location.name,
    };
  });

  const { data: organizationsData, isLoading: isLoadingOrganizations } =
    useOrganizationDropdown(searchOrganizationString);

  const allOrganizations = organizationsData?.records?.map((org) => {
    return {
      id: org.id,
      label: org.organisation_name,
    };
  });

  useEffect(() => {
    const fromDate = search.from ? dayjs(search.from).toDate() : undefined;
    const toDate = search.to ? dayjs(search.to).toDate() : undefined;

    if (fromDate || toDate) {
      setDateRange({ from: fromDate, to: toDate });
    }

    if (search.from || search.to) {
      navigate({
        to: location?.pathname,
        search: undefined,
        replace: true,
      });
    }
  }, [search.from, search.to, navigate]);

  return (
    <div>
      <div className="flex justify-end  items-center gap-2">
        <div className="relative">
          <ComboBox
            items={allOrganizations}
            placeholder="Select Organization"
            value={allOrganizations?.find((o) => o.id === searchOrganization)}
            onChange={(item) => setSearchOrganization(item?.id)}
            className="h-8 text-smd font-light border-gray-300"
            contentClassName="bg-white rounded"
            isLoading={isLoadingOrganizations}
            onSearchChange={setSearchOrganizationString}
            enableApiSearch={true}
          />
        </div>
        <div>
          <ComboBox
            items={location2}
            placeholder="Select Location"
            value={location2?.find((o) => o.id === selectedLocation)}
            onChange={(item) => setSelectedLocation(item?.id)}
            defaultIcon={MapPin}
            className="h-8 text-smd font-light border-gray-300"
            contentClassName="bg-white rounded"
            isLoading={isLoading}
            onSearchChange={(search) => setSearchLocation(search)}
            enableApiSearch={true}
          />
        </div>
        <div>
          <CustomDateRangePicker
            date={dateRange}
            setDate={setDateRange}
            mode="month-year"
            align="end"
          />
        </div>
      </div>
      <Stats dateRange={dateRange} searchOrganization={searchOrganization} />
      <div className="p-1 mt-1">
        <OrganizationStatistics
          dateRange={dateRange}
          location={selectedLocation}
          organization={searchOrganization}
        />
      </div>
    </div>
  );
};

export default RevenueStatistics;
