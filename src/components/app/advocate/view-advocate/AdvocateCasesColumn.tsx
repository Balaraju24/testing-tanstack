import DefaultUserIcon from "@/components/icons/default-user";
import ViewIcon from "@/components/icons/view-icon";
import { Avatar } from "@/components/ui/avatar";
import { statusConstants } from "@/lib/constants/statusConstants";
import { capitalize } from "@/utils/helpers/app";
import { useRouter } from "@tanstack/react-router";

export default function AdvisorCasesColumns() {
  const router = useRouter();

  return [
    {
      accessorFn: (row: any) => row.temp_id || "--",
      id: "service_id",
      cell: (info: any) => <span className="text-xs">{info.getValue()}</span>,
      width: "100px",
      maxWidth: "100px",
      minWidth: "100px",
      header: () => <span className="text-sm">File ID</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) => row.service_type || "--",
      id: "service_type",
      cell: (info: any) => <span className="text-xs">{info.getValue()}</span>,
      width: "100px",
      maxWidth: "100px",
      minWidth: "100px",
      header: () => <span className="text-sm">Service Type</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) => row.organisation_name || "--",
      id: "organisation_name",
      cell: (info: any) => (
        <div className="text-xs truncate w-32" title={info.getValue()}>
          {info.getValue()}
        </div>
      ),
      width: "130px",
      maxWidth: "130px",
      minWidth: "130px",
      header: () => <span className="text-sm">Organisation</span>,
      footer: (props: any) => props.column.id,
    },
    {
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
      cell: (info: any) => {
        const { fullname } = info.getValue() || { fullname: "--" };
        return (
          <div className="flex gap-2 items-center">
            <Avatar className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F7F7] border border-grey-800 ">
              <DefaultUserIcon className="w-4 h-4" />
            </Avatar>
            <div className="self-center text-xs truncate w-32" title={fullname}>
              {fullname}
            </div>
          </div>
        );
      },
      width: "120px",
      maxWidth: "120px",
      minWidth: "120px",
      header: () => <span className="text-sm">Point of Contact</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.stage,
      id: "status",
      cell: (info: any) => {
        return (
          <div
            className="text-xs  uppercase font-normal w-32 truncate"
            style={{
              color: statusConstants.find(
                (status) => status.value === info.getValue()
              )?.color,
            }}
            title={
              statusConstants.find((status) => status.value === info.getValue())
                ?.label
            }
          >
            {
              statusConstants.find((status) => status.value === info.getValue())
                ?.label
            }
          </div>
        );
      },
      width: "130px",
      maxWidth: "130px",
      minWidth: "130px",
      header: () => <span className="text-sm">Status</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) => row.actions,
      id: "actions",
      cell: (info: any) => (
        <ul className="table-action-buttons flex space-x-3 items-center cursor-pointer">
          <li
            onClick={() => {
              const { service_type, id } = info.row.original;

              if (service_type === "Legal opinion") {
                router.navigate({
                  to: `/legal-opinion/service/${id}/notes`,
                });
              } else {
                router.navigate({
                  to: `/litigations/service/${id}/notes`,
                });
              }
            }}
            title="View Service"
          >
            <ViewIcon className={"w-[20px]"} />
          </li>
        </ul>
      ),
      header: () => <span className="text-sm">Actions</span>,
      footer: (props: any) => props.column.id,
      width: "60px",
      minWidth: "60px",
      maxWidth: "60px",
    },
  ];
}
