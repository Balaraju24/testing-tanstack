import TanStackTable from "@/components/core/TanstackTable";
import LocationIcon from "@/components/icons/location-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CreateLocationAPI,
  deleteLocationAPI,
  editLocationAPI,
  getAllLocationsAPI,
  toggleStatusLocationAPI,
} from "@/http/services/location";
import { Location } from "@/lib/interfaces/location";
import { PaginationType } from "@/lib/interfaces/pagination";
import { addSerial } from "@/utils/helpers/app";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Loader2, PlusIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SearchFilter from "../../core/SearchFilter";
import LocationColumns from "./LocationsColumns";

const Locations = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [errors, setErrors] = useState<any>({});
  const [locationName, setLocationName] = useState<string>("");
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [pagination, setPagination] = useState<PaginationType>({
    current_page: Number(searchParams.get("page")) || 1,
    page_size: Number(searchParams.get("page_size")) || 15,
  });
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [optimisticUpdates, setOptimisticUpdates] = useState<
    Record<number, "Active" | "Inactive">
  >({});
  const [searchString, setSearchString] = useState<string>("");
  const [debounceSearchString, setDebounceSearchString] = useState<string>("");

  const isEditing = editingLocation !== null;

  const {
    isLoading,
    data: locationsData,
    refetch: refetchLocations,
  } = useQuery({
    queryKey: ["locations", pagination, debounceSearchString],
    queryFn: async () => {
      const queryParams = {
        page: pagination.current_page,
        page_size: pagination.page_size,
        ...(debounceSearchString && { search_string: debounceSearchString }),
      };
      const response = await getAllLocationsAPI(queryParams);
      if (response.status === 200 || response.status === 201) {
        const { records, pagination_info } = response?.data?.data || {};
        const mappedRecords =
          records?.map((record: any) => ({
            id: record.id,
            name: record.name,
            dateAdded: dayjs(record.created_at).format("DD MMM YYYY"),
            status: record.active ? "Active" : "Inactive",
          })) || [];
        const recordsWithSerial = addSerial(
          mappedRecords,
          pagination_info?.current_page || 1,
          pagination_info?.page_size || 15
        );
        return { records: recordsWithSerial, pagination_info };
      }
      return { records: [], pagination_info: {} };
    },
    refetchOnWindowFocus: false,
  });

  const saveLocationMutation = useMutation({
    mutationFn: async ({
      name,
      locationId,
    }: {
      name: string;
      locationId?: number;
    }) => {
      if (locationId) {
        const response = await editLocationAPI({
          locationId,
          payload: { name, id: locationId },
        });
        return response;
      } else {
        const response = await CreateLocationAPI({ name });
        return response;
      }
    },
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        refetchLocations();
        resetForm();
        setErrors({});
      }
    },
    onError: (response: any) => {
      const backendErrors = response?.data?.errData || {};
      setErrors(backendErrors?.name || {});
    },
  });

  const deleteLocationMutation = useMutation({
    mutationFn: async (locationId: number) => {
      setDeletingId(locationId);
      const response = await deleteLocationAPI({ locationId });
      return response.data;
    },
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Location deleted successfully", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
        refetchLocations();
      }
    },
    onError: (error: any) => {
      if (error.status === 409) {
        toast.error(error.message, {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
      }
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  const { mutate: toggleStatusMutation } = useMutation({
    mutationFn: async ({
      locationId,
      active,
    }: {
      locationId: number;
      active: boolean;
    }) => {
      setTogglingId(locationId);

      setOptimisticUpdates((prev) => ({
        ...prev,
        [locationId]: active ? "Active" : "Inactive",
      }));

      const response = await toggleStatusLocationAPI({
        locationId,
        payload: { active },
      });
      return { response, locationId, active };
    },
    onSuccess: ({ response, locationId, active }) => {
      if (response.status === 200 || response.status === 201) {
        if (togglingId === locationId) {
          toast.success("Location status updated successfully", {
            action: {
              label: "✕",
              onClick: () => toast.dismiss(),
            },
          });
        }

        refetchLocations().finally(() => {
          setOptimisticUpdates((prev) => {
            const updated = { ...prev };
            delete updated[locationId];
            return updated;
          });
        });
      }
    },
    onError: (error, { locationId }) => {
      setOptimisticUpdates((prev) => {
        const updated = { ...prev };
        delete updated[locationId];
        return updated;
      });

      if (togglingId === locationId) {
        toast.error("Failed to update location status", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
      }
    },
    onSettled: () => {
      setTogglingId(null);
    },
  });

  const dataWithOptimisticUpdates =
    locationsData?.records?.map((record: Location) => ({
      ...record,
      status: optimisticUpdates[record.id] || record.status,
    })) || [];

  const handleSaveLocation = () => {
    if (!locationName.trim()) {
      setErrors({ 0: "Location name is required" });
      return;
    }
    saveLocationMutation.mutate({
      name: locationName,
      locationId: editingLocation?.id,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveLocationMutation.mutate({
        name: locationName,
        locationId: editingLocation?.id,
      });
    }
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setLocationName(location.name);
    setErrors({});
  };

  const resetForm = () => {
    setLocationName("");
    setEditingLocation(null);
    setErrors({});
  };

  const toggleStatus = (id: number) => {
    if (togglingId === id) {
      return;
    }

    const currentLocation = locationsData?.records?.find(
      (loc: Location) => loc.id === id
    );

    if (currentLocation) {
      const currentStatus = optimisticUpdates[id] || currentLocation.status;
      const newActiveStatus = currentStatus === "Inactive";

      toggleStatusMutation({
        locationId: id,
        active: newActiveStatus,
      });
    }
  };

  const handleGetData = ({
    page,
    page_size,
  }: {
    page: number;
    page_size: number;
  }) => {
    setPagination({ current_page: page, page_size });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setPagination((prev) => ({
        ...prev,
        current_page: searchString ? prev.current_page : 1,
      }));

      setDebounceSearchString(searchString);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchString]);

  return (
    <div className="flex gap-2 bg-white">
      <div className="w-96 flex-shrink-0 p-2">
        <div className="bg-white rounded-sm border border-gray-300 p-3">
          <div className="flex items-start gap-2 mb-6 border-b border-gray-200 pb-3">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
              <LocationIcon className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-normal text-gray-900">
                    {isEditing ? "Edit Location" : "Add Location"}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {isEditing
                      ? "Update the location details"
                      : "Create a new business location"}
                  </p>
                </div>
                {isEditing && (
                  <button
                    onClick={resetForm}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Cancel editing"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-normal text-gray-500 mb-2">
                Location
              </label>
              <Input
                type="text"
                placeholder="Enter location name"
                value={locationName}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.charAt(0).toUpperCase() + value.slice(1);
                  if (/^[A-Za-z0-9 -]*$/.test(value)) {
                    setLocationName(value);
                  }
                }}
                onKeyDown={handleKeyDown}
                className="w-full h-10 text-sm bg-gray-100 border-gray-300 !rounded-none focus:border-gray-400 focus:ring-0"
              />
              <div className="text-red-500 text-xs mt-1">
                <p>{errors[0]}</p>
              </div>
            </div>
            {isEditing ? (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleSaveLocation}
                  disabled={saveLocationMutation.isPending}
                  className="w-full h-10 bg-black cursor-pointer hover:bg-gray-800 text-white text-sm font-normal !rounded-none flex items-center justify-center gap-2"
                >
                  {saveLocationMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <PlusIcon className="w-4 h-4" />
                  )}
                  Update Location
                </Button>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="w-full h-10 border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-normal !rounded-none"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleSaveLocation}
                disabled={saveLocationMutation.isPending}
                className="w-full h-10 bg-black cursor-pointer hover:bg-gray-800 text-white text-sm font-normal !rounded-none flex items-center justify-center gap-2"
              >
                {saveLocationMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <PlusIcon className="w-4 h-4" />
                )}
                Add Location
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden pl-0 mt-2">
        <div className="bg-white rounded-sm border border-gray-300 flex flex-col px-2">
          <div className="border-b border-gray-200 flex-shrink-0 py-2 mb-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-normal text-gray-900">
                Manage your business locations
              </h2>
              <div className="flex items-center gap-4">
                <SearchFilter
                  searchString={searchString}
                  setSearchString={setSearchString}
                  title="Search by location"
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <TanStackTable
              data={dataWithOptimisticUpdates}
              columns={LocationColumns({
                toggleStatus,
                deleteLocation: deleteLocationMutation.mutate,
                editLocation: handleEditLocation,
                deletingId,
                togglingId,
                editingLocation,
              })}
              paginationDetails={
                locationsData?.pagination_info || {
                  current_page: pagination.current_page,
                  page_size: pagination.page_size,
                  total_records: 0,
                  total_pages: 1,
                }
              }
              getData={handleGetData}
              loading={isLoading}
              removeSortingForColumnIds={[
                "serial",
                "status",
                "name",
                "dateAdded",
                "actions",
              ]}
              heightClass="h-[calc(100vh-190px)] 3xl:h-[calc(100vh-184px)]"
              noDataLabel="locations"
              noDataDescription={"Get started by creating your first Location"}
              showNoDataIcon={true}
              noDataHeight={"h-[calc(100vh-170px)]"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
