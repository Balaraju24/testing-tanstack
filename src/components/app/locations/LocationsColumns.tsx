import DeleteStrokeIcon from "@/components/icons/delete-stroke-icon";
import { Location } from "@/lib/interfaces/location";
import { Edit2Icon, Loader2 } from "lucide-react";
import { Switch } from "./Switch";
import OverflowContentTooltip from "@/components/core/OverflowContentTooltip";

export default function LocationColumns({
  toggleStatus,
  deleteLocation,
  editLocation,
  deletingId,
  togglingId,
  editingLocation,
}: {
  toggleStatus: (id: number) => void;
  deleteLocation: (id: number) => void;
  editLocation: (location: Location) => void;
  deletingId: number | null;
  togglingId: number | null;
  editingLocation: Location | null | any;
}) {
  const isEditModeActive = editingLocation !== null;

  return [
    {
      accessorKey: "serial",
      id: "serial",
      cell: (info: any) => (
        <div className="text-white-700 text-sm font-normal pl-6">
          {info.getValue()}
        </div>
      ),
      header: () => (
        <div className="text-white text-sm font-normal pl-6">S No</div>
      ),
      size: 80,
    },
    {
      accessorKey: "name",
      id: "name",
      cell: (info: any) => <OverflowContentTooltip text={info.getValue()} />,
      header: () => (
        <div className="text-white text-sm font-normal pl-6">Location Name</div>
      ),
      width: "190px",
      maxWidth: "190px",
      minWidth: "190px",
    },
    {
      accessorKey: "dateAdded",
      id: "dateAdded",
      cell: (info: any) => (
        <div className="text-gray-700 text-sm font-normal pl-6">
          {info.getValue()}
        </div>
      ),
      header: () => (
        <div className="text-white text-sm font-normal pl-6">Date Added</div>
      ),
      width: "130px",
      maxWidth: "100px",
      minWidth: "100px",
    },
    {
      accessorKey: "status",
      id: "status",
      cell: (info: any) => {
        const status = info.getValue();
        const rowData = info.row.original;
        const isToggling = togglingId === rowData.id;
        const isDisabled = togglingId !== null && togglingId !== rowData.id;

        return (
          <div className="pl-6">
            <Switch
              key={`switch-${rowData.id}-${status}`}
              status={status}
              toggleStatus={() => toggleStatus(rowData.id)}
              disabled={isToggling}
              disabledAll={isDisabled}
              editDisable={isEditModeActive}
            />
          </div>
        );
      },
      header: () => (
        <div className="text-white text-sm font-normal pl-6">Status</div>
      ),
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
    },
    {
      accessorFn: (row: any) => row.actions,
      id: "actions",
      cell: (info: any) => {
        const rowData = info.row.original;
        const isRowDisabled = rowData.status === "Inactive";

        return (
          <div className="table-action-buttons flex space-x-3 items-center">
            <span
              onClick={() =>
                !isRowDisabled && !isEditModeActive && editLocation(rowData)
              }
              title={isRowDisabled || isEditModeActive ? "" : "Edit Location"}
              className={`transition-colors ${
                isRowDisabled || isEditModeActive
                  ? "pointer-events-none text-gray-400"
                  : "hover:text-blue-600 cursor-pointer"
              }`}
            >
              <Edit2Icon className="size-4" />
            </span>

            <span
              onClick={() =>
                !isRowDisabled &&
                !isEditModeActive &&
                deleteLocation(rowData.id)
              }
              title={isRowDisabled || isEditModeActive ? "" : "Delete Location"}
              className={`transition-colors ${
                isRowDisabled || isEditModeActive
                  ? "pointer-events-none"
                  : "hover:text-red-600 cursor-pointer"
              }`}
            >
              {deletingId === rowData.id ? (
                <Loader2 className="size-4 text-black animate-spin" />
              ) : (
                <DeleteStrokeIcon
                  className={`size-4 ${
                    isRowDisabled || isEditModeActive
                      ? "text-gray-400"
                      : "text-black"
                  }`}
                />
              )}
            </span>
          </div>
        );
      },
      header: () => <span className="text-sm">Actions</span>,
      footer: (props: any) => props.column.id,
      width: "100px",
      minWidth: "100px",
      maxWidth: "100px",
    },
  ];
}
