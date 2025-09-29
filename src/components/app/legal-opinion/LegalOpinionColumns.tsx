import OverflowContentTooltip from "@/components/core/OverflowContentTooltip";
import DefaultUserIcon from "@/components/icons/default-user";
import SettingsIcon from "@/components/icons/settings-icon";
import ViewIcon from "@/components/icons/view-icon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { statusConstants } from "@/lib/constants/statusConstants";
import { capitalize } from "@/utils/helpers/app";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useNavigate, useRouter } from "@tanstack/react-router";
import dayjs from "dayjs";

export default function LegalOpinionColumns() {
  const router = useRouter();
  const navigate = useNavigate();
  const { isUser, isManager, isAdvocate, isAdmin } = useUserDetails();
  const handleManage = (service_id: number) => {
    sessionStorage.setItem("case-origin", "legal-opinion");
    if (isUser()) {
      navigate({
        to: `/legal-opinion/service/${service_id}/user/manage`,
      });
      return;
    }
    navigate({
      to: `/legal-opinion/service/${service_id}/manage`,
    });
  };

  const columns = [
    {
      accessorFn: (row: any) => row.temp_id,
      id: "service_id",
      cell: (info: any) => {
        return (
          <span className="text-xs  flex gap-2 [&_svg]:size-4 items-center ">
            {info.getValue() || "--"}
          </span>
        );
      },
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
      header: () => <span className="text-sm  ">File ID</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) => row.organisation_name,
      id: "organization_name",
      cell: (info: any) => {
        return (
          <div className="text-xs  w-36 truncate" title={info.getValue()}>
            {info.getValue() || "--"}
          </div>
        );
      },
      width: "180px",
      maxWidth: "180px",
      minWidth: "180px",
      header: () => <span className="text-sm  ">Organization</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) => row.stage,
      id: "status",
      cell: (info: any) => {
        return (
          <span
            className="text-xs  uppercase font-normal"
            style={{
              color: statusConstants.find(
                (status) => status.value === info.getValue()
              )?.color,
            }}
          >
            {
              statusConstants.find((status) => status.value === info.getValue())
                ?.label
            }
          </span>
        );
      },
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
      header: () => <span className="text-sm">Stage</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.due_date,
      id: "due_date",
      cell: (info: any) => {
        const value = info.getValue();
        return (
          <span className="text-xs ">
            {value ? dayjs(value).format("DD MMM YYYY") : "--"}{" "}
          </span>
        );
      },
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
      header: () => <span className="text-sm  ">Due Date</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.actions,
      id: "actions",
      cell: (info: any) => (
        <div className="table-action-buttons flex space-x-3 items-center  cursor-pointer">
          <span
            onClick={() => {
              sessionStorage.setItem("case-origin", "legal-opinion");
              router.navigate({
                to: `/legal-opinion/service/${info.row.original.id}/notes`,
              });
            }}
            title="View Service"
          >
            <ViewIcon className={"size-4"} />
          </span>
          <span
            onClick={() => {
              handleManage(info.row.original.id);
            }}
            title="Manage Service"
          >
            <SettingsIcon className={"size-4 text-black"} />
          </span>
        </div>
      ),
      header: () => <span className="text-sm  ">Actions</span>,
      footer: (props: any) => props.column.id,
      width: "120px",
      minWidth: "120px",
      maxWidth: "120px",
    },
  ];
  if (isUser() || isManager() || isAdmin()) {
    columns.splice(2, 0, {
      accessorFn: (row: any) => {
        const firstName = row.advocate?.first_name
          ? capitalize(row.advocate.first_name)
          : "";
        const lastName = row.advocate?.last_name
          ? capitalize(row.advocate.last_name)
          : "";
        return {
          fullname: `${firstName} ${lastName}`.trim(),
          avatar: row?.advocate?.profile_pic || null,
        };
      },
      id: "advocate_name",
      header: () => <span className="text-sm  ">Advocate</span>,
      footer: (props: any) => props.column.id,
      width: "180px",
      maxWidth: "180px",
      minWidth: "180px",
      cell: (info: any) => {
        const { fullname, avatar } = info.getValue() || {
          fullname: "--",
          avatar: null,
        };
        const displayName = fullname.trim() === "" ? "--" : fullname;
        return (
          <span className="flex gap-2 items-center">
            {avatar ? (
              <Avatar className="w-7 h-7 border-0">
                <AvatarImage
                  src={avatar}
                  className="object-center"
                ></AvatarImage>
              </Avatar>
            ) : (
              <Avatar className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F7F7] border border-grey-800">
                <DefaultUserIcon className="w-4 h-4" />
              </Avatar>
            )}
            <div
              className="self-center text-xs truncate w-48"
              title={displayName}
            >
              <OverflowContentTooltip text={displayName} />
            </div>
          </span>
        );
      },
    });
  }
  if (isAdvocate() || isManager() || isAdmin() || isUser()) {
    columns.splice(2, 0, {
      accessorFn: (row: any) => {
        const name = isUser()
          ? row.customer_name
            ? capitalize(row.customer_name)
            : ""
          : `${row.user?.first_name ? capitalize(row.user.first_name) : ""} ${row.user?.last_name ? capitalize(row.user.last_name) : ""}`;
        return { fullname: name || "--", avatar: null };
      },
      id: "customer_name",
      cell: (info: any) => {
        const { fullname } = info.getValue() || { fullname: "--" };
        return (
          <span className="flex gap-2 items-center">
            <Avatar className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F7F7] border border-grey-800">
              <DefaultUserIcon className="w-4 h-4" />
            </Avatar>
            <span
              className="self-center text-xs w-42 truncate"
              title={fullname}
            >
              {fullname}
            </span>
          </span>
        );
      },
      width: "220px",
      maxWidth: "220px",
      minWidth: "220px",
      header: () => (
        <span className="text-sm">
          {isUser() ? "Customer" : "Point of Contact"}
        </span>
      ),
      footer: (props: any) => props.column.id,
    });
  }
  return columns;
}
