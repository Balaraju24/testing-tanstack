import EditNoteIcon from "@/components/icons/edit-note-icon";
import { getColorByFirstLetter } from "@/utils/helpers/getColorByFirstLetter";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useRouter } from "@tanstack/react-router";

export default function OrganizationColumns() {
  const router = useRouter();
  const { isManager, isAdmin } = useUserDetails();
  const columns = [
    {
      accessorFn: (row: any) => row.customer_id,
      id: "customer_id",
      cell: (info: any) => {
        return <span className="text-xs">{info.getValue() || "--"}</span>;
      },
      width: "130px",
      maxWidth: "130px",
      minWidth: "130px",
      header: () => <span className="text-sm">Institution ID</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.organisation_name,
      id: "organisation_name",
      cell: (info: any) => {
        return (
          <div className="text-xs w-32 truncate" title={info.getValue()}>
            {info.getValue() || "--"}
          </div>
        );
      },
      width: "140px",
      maxWidth: "140px",
      minWidth: "140px",
      header: () => <span className="text-sm">Organization</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.employee_id,
      id: "employee_id",
      cell: (info: any) => {
        return <span className="text-xs">{info.getValue() || "--"}</span>;
      },
      width: "130px",
      maxWidth: "130px",
      minWidth: "130px",
      header: () => <span className="text-sm">Employee ID</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) => {
        const capitalize = (str: string) =>
          str.replace(/\b\w/g, (char) => char.toUpperCase());

        const firstName = row.first_name ? capitalize(row.first_name) : "";
        const lastName = row.last_name ? capitalize(row.last_name) : "";

        return {
          fullname: `${firstName} ${lastName}`,
          avatar: row.profile_pic || null,
        };
      },
      id: "first_name",
      cell: (info: any) => {
        const { fullname, avatar } = info.getValue() || {
          fullname: "--",
          avatar: null,
        };
        return (
          <span className="flex gap-2 items-center">
            <div className="self-center text-xs truncate w-32" title={fullname}>
              {fullname}
            </div>
          </span>
        );
      },
      width: "120px",
      maxWidth: "120px",
      minWidth: "120px",
      header: () => <span className="text-sm">Employee</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.email,
      id: "email",
      cell: (info: any) => {
        return (
          <div className="truncate w-32 text-xs" title={info.getValue() || ""}>
            {info.getValue() || "--"}
          </div>
        );
      },
      width: "180px",
      maxWidth: "180px",
      minWidth: "180px",
      header: () => <span className="text-sm">Email ID</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) =>
        row.phone
          ? row.phone.replace(/^(\+91)(\d{5})(\d{5})$/, "$1 $2$3")
          : "--",
      id: "phone",
      cell: (info: any) => {
        return <span className="text-xs">{info.getValue() ?? "--"}</span>;
      },
      width: "140px",
      maxWidth: "140px",
      minWidth: "140px",
      header: () => <span className="text-sm">Phone Number</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) => row.branch_code,
      id: "branch_code",
      cell: (info: any) => {
        return (
          <span
            className="text-xs flex gap-2 [&_svg]:size-4 items-center truncate w-32"
            title={info.getValue() || "--"}
          >
            {info.getValue() || "--"}
          </span>
        );
      },
      width: "130px",
      maxWidth: "130px",
      minWidth: "130px",
      header: () => <span className="text-sm">Branch Code</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.branch_name,
      id: "branch_name",
      cell: (info: any) => {
        return (
          <div
            className="self-center text-xs truncate w-32"
            title={info.getValue() || "--"}
          >
            {info.getValue() || "--"}
          </div>
        );
      },
      width: "140px",
      maxWidth: "140px",
      minWidth: "140px",
      header: () => <span className="text-sm">Branch Name</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) => row.designation,
      id: "designation",
      cell: (info: any) => {
        return (
          <span className="text-xs flex gap-2 [&_svg]:size-4 items-center ">
            {info.getValue() || "--"}
          </span>
        );
      },
      width: "120px",
      maxWidth: "120px",
      minWidth: "120px",
      header: () => <span className="text-sm">Designation</span>,
      footer: (props: any) => props.column.id,
    },
  ];

  if (isAdmin()) {
    columns.splice(6, 0, {
      accessorFn: (row: any) => row.location?.name,
      id: "location",
      cell: (info: any) => {
        const locationName = info.getValue();
        const { background, color } = getColorByFirstLetter(locationName || "");
        return (
          <div
            className="text-xs flex gap-2 [&_svg]:size-4 cursor-pointer items-center px-2 py-1 rounded-full w-24 truncate whitespace-nowrap overflow-hidden"
            title={locationName}
            style={{
              backgroundColor: background,
              color: "#333333",
              border: `1px solid ${background}`,
            }}
          >
            <span className="truncate w-32 ">{locationName || "--"}</span>
          </div>
        );
      },
      width: "120px",
      maxWidth: "120px",
      minWidth: "120px",
      header: () => <span className="text-sm">Location</span>,
      footer: (props: any) => props.column.id,
    });
  }

  if (isManager()) {
    columns.splice(10, 0, {
      accessorFn: (row: any) => row.actions,
      id: "actions",
      cell: (info: any) => (
        <div className="table-action-buttons flex items-center  cursor-pointer">
          <span
            onClick={() => {
              router.navigate({
                to: `/edit-organization/${info.row.original.id}`,
              });
            }}
            title="Edit Organization"
          >
            <EditNoteIcon className={"size-4 text-black"} />
          </span>
        </div>
      ),
      header: () => <span className="text-sm">Actions</span>,
      footer: (props: any) => props.column.id,
      width: "80px",
      minWidth: "80px",
      maxWidth: "80px",
    });
  }

  return columns;
}
