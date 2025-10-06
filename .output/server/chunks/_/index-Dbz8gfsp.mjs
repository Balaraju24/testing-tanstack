import { jsx, jsxs } from 'react/jsx-runtime';
import { T as TanStackTable } from './TanstackTable-CsC49-gk.mjs';
import { L as LocationIcon } from './location-icon-BjUVjaW-.mjs';
import { B as Button } from './router-e7zdrxGz.mjs';
import { I as Input } from './input-CcfBn-WR.mjs';
import { g as getAllLocationsAPI, e as editLocationAPI, C as CreateLocationAPI, d as deleteLocationAPI, t as toggleStatusLocationAPI } from './location-D_tPNO3m.mjs';
import { a as addSerial } from './app-CEOvaEAI.mjs';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { X, Loader2, PlusIcon, Edit2Icon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { S as SearchFilter } from './SearchFilter-BoKc3EM1.mjs';
import { D as DeleteStrokeIcon } from './delete-stroke-icon-mn8-8d5M.mjs';
import { O as OverflowContentTooltip } from './OverflowContentTooltip-CDqdkYzJ.mjs';
import './NoDataBlock-OQRQAvdc.mjs';
import './no-cases-data-B3QWVZUO.mjs';
import './useUserPermissions-IrViIWLA.mjs';
import './userDetails-Dbr9T6uw.mjs';
import '@tanstack/react-store';
import './noDataConstants-CAKRQRCT.mjs';
import '@tanstack/react-table';
import './skeleton-BAyQx-Zm.mjs';
import './select-DGUsKCQS.mjs';
import '@radix-ui/react-select';
import '@tanstack/react-router-ssr-query';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'framer-motion';
import 'react-error-boundary';
import './fetch-Cpm1bFFM.mjs';
import 'js-cookie';
import '@radix-ui/react-tooltip';
import './tooltip-BKF0DBvK.mjs';

function Switch({
  status,
  toggleStatus,
  disabled = false,
  disabledAll = false,
  editDisable = false,
  className = ""
}) {
  const isActive = status === "Active";
  const isDisabled = disabled || disabledAll || editDisable;
  const handleClick = () => {
    if (isDisabled) return;
    toggleStatus();
  };
  return /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 ${className}`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: handleClick,
        className: `
          relative flex items-center justify-center w-10 h-5 rounded-full transition-all duration-300 ease-in-out
          ${isDisabled ? "cursor-default" : "cursor-pointer"}
          ${isActive ? "bg-green-500" : "bg-red-500"}
          ${isDisabled ? "opacity-70" : ""}
        `,
        children: disabled ? /* @__PURE__ */ jsx(Loader2, { className: "w-3 h-3 text-white animate-spin" }) : /* @__PURE__ */ jsx(
          "div",
          {
            className: `
              absolute w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out
              ${isActive ? "translate-x-2.5" : "-translate-x-2.5"}
            `
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: `text-sm font-medium select-none ${isActive ? "text-green-600" : "text-red-500"} ${disabled || editDisable ? "opacity-70" : ""}`,
        children: isActive ? "Active" : "Inactive"
      }
    )
  ] });
}
function LocationColumns({
  toggleStatus,
  deleteLocation,
  editLocation,
  deletingId,
  togglingId,
  editingLocation
}) {
  const isEditModeActive = editingLocation !== null;
  return [
    {
      accessorKey: "serial",
      id: "serial",
      cell: (info) => /* @__PURE__ */ jsx("div", { className: "text-white-700 text-sm font-normal pl-6", children: info.getValue() }),
      header: () => /* @__PURE__ */ jsx("div", { className: "text-white text-sm font-normal pl-6", children: "S No" }),
      size: 80
    },
    {
      accessorKey: "name",
      id: "name",
      cell: (info) => /* @__PURE__ */ jsx(OverflowContentTooltip, { text: info.getValue() }),
      header: () => /* @__PURE__ */ jsx("div", { className: "text-white text-sm font-normal pl-6", children: "Location Name" }),
      width: "190px",
      maxWidth: "190px",
      minWidth: "190px"
    },
    {
      accessorKey: "dateAdded",
      id: "dateAdded",
      cell: (info) => /* @__PURE__ */ jsx("div", { className: "text-gray-700 text-sm font-normal pl-6", children: info.getValue() }),
      header: () => /* @__PURE__ */ jsx("div", { className: "text-white text-sm font-normal pl-6", children: "Date Added" }),
      width: "130px",
      maxWidth: "100px",
      minWidth: "100px"
    },
    {
      accessorKey: "status",
      id: "status",
      cell: (info) => {
        const status = info.getValue();
        const rowData = info.row.original;
        const isToggling = togglingId === rowData.id;
        const isDisabled = togglingId !== null && togglingId !== rowData.id;
        return /* @__PURE__ */ jsx("div", { className: "pl-6", children: /* @__PURE__ */ jsx(
          Switch,
          {
            status,
            toggleStatus: () => toggleStatus(rowData.id),
            disabled: isToggling,
            disabledAll: isDisabled,
            editDisable: isEditModeActive
          },
          `switch-${rowData.id}-${status}`
        ) });
      },
      header: () => /* @__PURE__ */ jsx("div", { className: "text-white text-sm font-normal pl-6", children: "Status" }),
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px"
    },
    {
      accessorFn: (row) => row.actions,
      id: "actions",
      cell: (info) => {
        const rowData = info.row.original;
        const isRowDisabled = rowData.status === "Inactive";
        return /* @__PURE__ */ jsxs("div", { className: "table-action-buttons flex space-x-3 items-center", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              onClick: () => !isRowDisabled && !isEditModeActive && editLocation(rowData),
              title: isRowDisabled || isEditModeActive ? "" : "Edit Location",
              className: `transition-colors ${isRowDisabled || isEditModeActive ? "pointer-events-none text-gray-400" : "hover:text-blue-600 cursor-pointer"}`,
              children: /* @__PURE__ */ jsx(Edit2Icon, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              onClick: () => !isRowDisabled && !isEditModeActive && deleteLocation(rowData.id),
              title: isRowDisabled || isEditModeActive ? "" : "Delete Location",
              className: `transition-colors ${isRowDisabled || isEditModeActive ? "pointer-events-none" : "hover:text-red-600 cursor-pointer"}`,
              children: deletingId === rowData.id ? /* @__PURE__ */ jsx(Loader2, { className: "size-4 text-black animate-spin" }) : /* @__PURE__ */ jsx(
                DeleteStrokeIcon,
                {
                  className: `size-4 ${isRowDisabled || isEditModeActive ? "text-gray-400" : "text-black"}`
                }
              )
            }
          )
        ] });
      },
      header: () => /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Actions" }),
      footer: (props) => props.column.id,
      width: "100px",
      minWidth: "100px",
      maxWidth: "100px"
    }
  ];
}
const Locations = () => {
  var _a;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [errors, setErrors] = useState({});
  const [locationName, setLocationName] = useState("");
  const [editingLocation, setEditingLocation] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: Number(searchParams.get("page")) || 1,
    page_size: Number(searchParams.get("page_size")) || 15
  });
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [optimisticUpdates, setOptimisticUpdates] = useState({});
  const [searchString, setSearchString] = useState("");
  const [debounceSearchString, setDebounceSearchString] = useState("");
  const isEditing = editingLocation !== null;
  const {
    isLoading,
    data: locationsData,
    refetch: refetchLocations
  } = useQuery({
    queryKey: ["locations", pagination, debounceSearchString],
    queryFn: async () => {
      var _a2;
      const queryParams = {
        page: pagination.current_page,
        page_size: pagination.page_size,
        ...debounceSearchString && { search_string: debounceSearchString }
      };
      const response = await getAllLocationsAPI(queryParams);
      if (response.status === 200 || response.status === 201) {
        const { records, pagination_info } = ((_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.data) || {};
        const mappedRecords = (records == null ? void 0 : records.map((record) => ({
          id: record.id,
          name: record.name,
          dateAdded: dayjs(record.created_at).format("DD MMM YYYY"),
          status: record.active ? "Active" : "Inactive"
        }))) || [];
        const recordsWithSerial = addSerial(
          mappedRecords,
          (pagination_info == null ? void 0 : pagination_info.current_page) || 1,
          (pagination_info == null ? void 0 : pagination_info.page_size) || 15
        );
        return { records: recordsWithSerial, pagination_info };
      }
      return { records: [], pagination_info: {} };
    },
    refetchOnWindowFocus: false
  });
  const saveLocationMutation = useMutation({
    mutationFn: async ({
      name,
      locationId
    }) => {
      if (locationId) {
        const response = await editLocationAPI({
          locationId,
          payload: { name, id: locationId }
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
    onError: (response) => {
      var _a2;
      const backendErrors = ((_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.errData) || {};
      setErrors((backendErrors == null ? void 0 : backendErrors.name) || {});
    }
  });
  const deleteLocationMutation = useMutation({
    mutationFn: async (locationId) => {
      setDeletingId(locationId);
      const response = await deleteLocationAPI({ locationId });
      return response.data;
    },
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Location deleted successfully", {
          action: {
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        });
        refetchLocations();
      }
    },
    onError: (error) => {
      if (error.status === 409) {
        toast.error(error.message, {
          action: {
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        });
      }
    },
    onSettled: () => {
      setDeletingId(null);
    }
  });
  const { mutate: toggleStatusMutation } = useMutation({
    mutationFn: async ({
      locationId,
      active
    }) => {
      setTogglingId(locationId);
      setOptimisticUpdates((prev) => ({
        ...prev,
        [locationId]: active ? "Active" : "Inactive"
      }));
      const response = await toggleStatusLocationAPI({
        locationId,
        payload: { active }
      });
      return { response, locationId, active };
    },
    onSuccess: ({ response, locationId, active }) => {
      if (response.status === 200 || response.status === 201) {
        if (togglingId === locationId) {
          toast.success("Location status updated successfully", {
            action: {
              label: "\u2715",
              onClick: () => toast.dismiss()
            }
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
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        });
      }
    },
    onSettled: () => {
      setTogglingId(null);
    }
  });
  const dataWithOptimisticUpdates = ((_a = locationsData == null ? void 0 : locationsData.records) == null ? void 0 : _a.map((record) => ({
    ...record,
    status: optimisticUpdates[record.id] || record.status
  }))) || [];
  const handleSaveLocation = () => {
    if (!locationName.trim()) {
      setErrors({ 0: "Location name is required" });
      return;
    }
    saveLocationMutation.mutate({
      name: locationName,
      locationId: editingLocation == null ? void 0 : editingLocation.id
    });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveLocationMutation.mutate({
        name: locationName,
        locationId: editingLocation == null ? void 0 : editingLocation.id
      });
    }
  };
  const handleEditLocation = (location2) => {
    setEditingLocation(location2);
    setLocationName(location2.name);
    setErrors({});
  };
  const resetForm = () => {
    setLocationName("");
    setEditingLocation(null);
    setErrors({});
  };
  const toggleStatus = (id) => {
    var _a2;
    if (togglingId === id) {
      return;
    }
    const currentLocation = (_a2 = locationsData == null ? void 0 : locationsData.records) == null ? void 0 : _a2.find(
      (loc) => loc.id === id
    );
    if (currentLocation) {
      const currentStatus = optimisticUpdates[id] || currentLocation.status;
      const newActiveStatus = currentStatus === "Inactive";
      toggleStatusMutation({
        locationId: id,
        active: newActiveStatus
      });
    }
  };
  const handleGetData = ({
    page,
    page_size
  }) => {
    setPagination({ current_page: page, page_size });
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setPagination((prev) => ({
        ...prev,
        current_page: searchString ? prev.current_page : 1
      }));
      setDebounceSearchString(searchString);
    }, 1e3);
    return () => clearTimeout(handler);
  }, [searchString]);
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-2 bg-white", children: [
    /* @__PURE__ */ jsx("div", { className: "w-96 flex-shrink-0 p-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-sm border border-gray-300 p-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 mb-6 border-b border-gray-200 pb-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-black text-white flex items-center justify-center", children: /* @__PURE__ */ jsx(LocationIcon, { className: "w-8 h-8" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-base font-normal text-gray-900", children: isEditing ? "Edit Location" : "Add Location" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: isEditing ? "Update the location details" : "Create a new business location" })
          ] }),
          isEditing && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: resetForm,
              className: "p-1 hover:bg-gray-100 rounded",
              title: "Cancel editing",
              children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-gray-500" })
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-normal text-gray-500 mb-2", children: "Location" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              placeholder: "Enter location name",
              value: locationName,
              onChange: (e) => {
                let value = e.target.value;
                value = value.charAt(0).toUpperCase() + value.slice(1);
                if (/^[A-Za-z0-9 -]*$/.test(value)) {
                  setLocationName(value);
                }
              },
              onKeyDown: handleKeyDown,
              className: "w-full h-10 text-sm bg-gray-100 border-gray-300 !rounded-none focus:border-gray-400 focus:ring-0"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: /* @__PURE__ */ jsx("p", { children: errors[0] }) })
        ] }),
        isEditing ? /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: handleSaveLocation,
              disabled: saveLocationMutation.isPending,
              className: "w-full h-10 bg-black cursor-pointer hover:bg-gray-800 text-white text-sm font-normal !rounded-none flex items-center justify-center gap-2",
              children: [
                saveLocationMutation.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsx(PlusIcon, { className: "w-4 h-4" }),
                "Update Location"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: resetForm,
              variant: "outline",
              className: "w-full h-10 border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-normal !rounded-none",
              children: "Cancel"
            }
          )
        ] }) : /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: handleSaveLocation,
            disabled: saveLocationMutation.isPending,
            className: "w-full h-10 bg-black cursor-pointer hover:bg-gray-800 text-white text-sm font-normal !rounded-none flex items-center justify-center gap-2",
            children: [
              saveLocationMutation.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsx(PlusIcon, { className: "w-4 h-4" }),
              "Add Location"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-hidden pl-0 mt-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-sm border border-gray-300 flex flex-col px-2", children: [
      /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200 flex-shrink-0 py-2 mb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-normal text-gray-900", children: "Manage your business locations" }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsx(
          SearchFilter,
          {
            searchString,
            setSearchString,
            title: "Search by location"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
        TanStackTable,
        {
          data: dataWithOptimisticUpdates,
          columns: LocationColumns({
            toggleStatus,
            deleteLocation: deleteLocationMutation.mutate,
            editLocation: handleEditLocation,
            deletingId,
            togglingId,
            editingLocation
          }),
          paginationDetails: (locationsData == null ? void 0 : locationsData.pagination_info) || {
            current_page: pagination.current_page,
            page_size: pagination.page_size,
            total_records: 0,
            total_pages: 1
          },
          getData: handleGetData,
          loading: isLoading,
          removeSortingForColumnIds: [
            "serial",
            "status",
            "name",
            "dateAdded",
            "actions"
          ],
          heightClass: "h-[calc(100vh-190px)] 3xl:h-[calc(100vh-184px)]",
          noDataLabel: "locations",
          noDataDescription: "Get started by creating your first Location",
          showNoDataIcon: true,
          noDataHeight: "h-[calc(100vh-170px)]"
        }
      ) })
    ] }) })
  ] });
};
function RouteComponent() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Locations, {}) });
}

export { RouteComponent as component };
//# sourceMappingURL=index-Dbz8gfsp.mjs.map
