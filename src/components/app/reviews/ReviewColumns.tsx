import DefaultUserIcon from "@/components/icons/default-user";
import ViewIcon from "@/components/icons/view-icon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Props } from "@/lib/interfaces/review";
import { formatDateWithTime } from "@/utils/helpers/manage";

export default function ReviewColumns({ onViewClick }: Props) {
  const columns = [
    {
      accessorFn: (row: any) => row.review_by_user_first_name,
      id: "full_name",
      cell: (info: any) => {
        const firstName = info.row.original.review_by_user_first_name;
        const lastName = info.row.original.review_by_user_last_name;
        const profile = info.row.original.review_by_user_profile_pic || null;
        return (
          <span className="text-sm flex gap-2 items-center">
            {profile ? (
              <Avatar className="w-7 h-7">
                <AvatarImage src={profile} className="object-center" />
              </Avatar>
            ) : (
              <Avatar className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F7F7] border border-grey-900">
                <DefaultUserIcon className="w-4 h-4" />
              </Avatar>
            )}
            <span className="truncate">
              {firstName} {lastName}
            </span>
          </span>
        );
      },
      width: "220px",
      maxWidth: "220px",
      minWidth: "220px",
      header: () => <span className="text-sm">Point of Contact</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) => row.case_organisation_name || "--",
      id: "case_organisation_name",
      cell: (info: any) => {
        return (
          <span className="text-xs 3xl:text-sm">{info.getValue() || "--"}</span>
        );
      },
      width: "200px",
      maxWidth: "200px",
      minWidth: "200px",
      header: () => <span className="text-sm">Organisation</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) => row.case_temp_id || "--",
      id: "case_id",
      cell: (info: any) => {
        return (
          <span className="text-xs 3xl:text-sm">{info.getValue() || "--"}</span>
        );
      },
      width: "200px",
      maxWidth: "200px",
      minWidth: "200px",
      header: () => <span className="text-sm">File ID</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.created_at,
      id: "updated_at",
      cell: (info: any) => {
        const value = info.getValue();
        return (
          <span className="text-xs">
            {value ? formatDateWithTime(value) : "--"}
          </span>
        );
      },
      width: "200px",
      maxWidth: "200px",
      minWidth: "200px",
      header: () => <span className="text-sm">Date & Time</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.actions,
      id: "actions",
      cell: (info: any) => (
        <div className="table-action-buttons">
          <span
            onClick={() => onViewClick?.(info.row.original.case_id)}
            className="cursor-pointer"
            title="View Review"
          >
            <ViewIcon className={"w-[20px]"} />
          </span>
        </div>
      ),
      header: () => <span className="text-sm">Actions</span>,
      footer: (props: any) => props.column.id,
      width: "100px",
      minWidth: "100px",
      maxWidth: "100px",
    },
  ];

  return columns;
}
