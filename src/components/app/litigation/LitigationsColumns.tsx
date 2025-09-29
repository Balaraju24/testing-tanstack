import DefaultUserIcon from "@/components/icons/default-user";
import SettingsIcon from "@/components/icons/settings-icon";
import ViewIcon from "@/components/icons/view-icon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { statusConstants } from "@/lib/constants/statusConstants";
import { capitalize } from "@/utils/helpers/app";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useNavigate, useRouter } from "@tanstack/react-router";
import dayjs from "dayjs";
import { AdvocateGroupAvatars } from "../service/manage/AdvocatesList";

export default function LitigationsColumns() {
  const router = useRouter();
  const navigate = useNavigate();
  const { isUser, isManager, isAdvocate, isAdmin } = useUserDetails();

  const handleManage = (service_id: number) => {
    sessionStorage.setItem("case-origin", "litigation");

    if (isUser()) {
      navigate({
        to: `/litigations/service/${service_id}/user/manage`,
      });
      return;
    }
    navigate({
      to: `/litigations/service/${service_id}/manage`,
    });
  };

  const columns = [
    {
      accessorFn: (row: any) => row.temp_id,
      id: "case_reference",
      header: () => <span className="text-sm">File ID</span>,
      footer: (props: any) => props.column.id,
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
      cell: (info: any) => (
        <span className="text-xs">{info.getValue() || "--"}</span>
      ),
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
      accessorFn: (row: any) => row.advocate_cases || [],
      id: "advocates",
      header: () => <span className="text-sm">Advocates</span>,
      footer: (props: any) => props.column.id,
      width: "180px",
      maxWidth: "220px",
      minWidth: "180px",
      cell: (info: any) => {
        const advocateCases = info.getValue();
        const rowId = `litigation-${info.row.original.id}`;

        if (!advocateCases || advocateCases.length === 0) {
          return <span className="text-xs">Not Assigned</span>;
        }

        if (advocateCases.length === 1) {
          const advocate = advocateCases[0].advocate;
          const advocateName = advocate
            ? `${advocate.first_name || ""} ${advocate.last_name || ""}`.trim()
            : "Unknown Advocate";

          return (
            <div className="flex items-center space-x-2">
              <Avatar className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F7F7] border-none">
                {advocate?.profile_pic ? (
                  <AvatarImage
                    src={advocate.profile_pic}
                    alt={advocateName}
                    className="rounded-full h-7 w-7 object-cover object-top"
                  />
                ) : (
                  <DefaultUserIcon className="w-3 h-3" />
                )}
              </Avatar>
              <span
                className="text-xs max-w-32 truncate cursor-pointer"
                title={advocateName}
              >
                {advocateName || "--"}
              </span>
            </div>
          );
        }

        return (
          <AdvocateGroupAvatars advocateCases={advocateCases} id={rowId} />
        );
      },
    },
    {
      accessorFn: (row: any) => row.service?.issue || row.service_type || "",
      id: "service_type",
      header: () => <span className="text-sm"> Issue</span>,
      footer: (props: any) => props.column.id,
      width: "120px",
      maxWidth: "120px",
      minWidth: "120px",
      cell: (info: any) => (
        <span className="text-xs">{info.getValue() || "--"}</span>
      ),
    },

    {
      accessorFn: (row: any) => row.stage || "",
      id: "priority",
      header: () => <span className="text-sm"> Stage</span>,
      footer: (props: any) => props.column.id,
      width: "160px",
      maxWidth: "160px",
      minWidth: "160px",
      cell: (info: any) => {
        const value = info.getValue();
        if (!value) return "--";
        return (
          <span
            className="text-xs uppercase font-normal"
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
    },

    {
      accessorFn: (row: any) => row.next_hearing_date || "",
      id: "next_hearing",
      header: () => <span className="text-sm">Next Hearing</span>,
      footer: (props: any) => props.column.id,
      width: "180px",
      maxWidth: "220px",
      minWidth: "180px",
      cell: (info: any) => {
        const value = info.getValue();
        return (
          <span className="text-xs">
            {value ? dayjs(value).format("DD MMM YYYY") : "--"}{" "}
          </span>
        );
      },
    },

    {
      accessorFn: (row: any) => row,
      id: "actions",
      header: () => <span className="text-sm">Actions</span>,
      footer: (props: any) => props.column.id,
      width: "120px",
      minWidth: "120px",
      maxWidth: "120px",
      cell: (info: any) => (
        <div className="table-action-buttons text-xs flex space-x-3 items-center cursor-pointer">
          <span
            onClick={() => {
              sessionStorage.setItem("case-origin", "litigation");
              router.navigate({
                to: `/litigations/service/${info.row.original.id}/case-history`,
              });
            }}
            title="View Service"
          >
            <ViewIcon className="size-4" />
          </span>
          <span
            onClick={() => {
              handleManage(info.row.original.id);
            }}
            title="Manage Service"
          >
            <SettingsIcon className="size-4 text-black" />
          </span>
        </div>
      ),
    },
  ];

  if (isAdvocate() || isManager() || isUser() || isAdmin()) {
    columns.splice(2, 0, {
      accessorFn: (row: any) => {
        const firstName = row.user?.first_name
          ? capitalize(row.user.first_name)
          : "";
        const lastName = row.user?.last_name
          ? capitalize(row.user.last_name)
          : "";
        return {
          fullname: `${firstName} ${lastName}`,
          avatar: null,
        };
      },
      id: "customer_name",
      header: () => <span className="text-sm">Point of Contact</span>,
      footer: (props: any) => props.column.id,
      width: "200px",
      maxWidth: "200px",
      minWidth: "200px",
      cell: (info: any) => {
        const { fullname } = info.getValue() || { fullname: "--" };
        return (
          <div className="flex gap-2 items-center">
            <Avatar className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F7F7] border border-grey-800 ">
              <DefaultUserIcon className="w-4 h-4" />
            </Avatar>
            <div className="self-center text-xs w-36 truncate" title={fullname}>
              {fullname}
            </div>
          </div>
        );
      },
    });
  }

  return columns;
}
