import OverflowContentTooltip from "@/components/core/OverflowContentTooltip";
import ApprovedIcon from "@/components/icons/approved-Icon";
import { Button } from "@/components/ui/button";
import { formatDateWithTime } from "@/utils/helpers/manage";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function PaymentsColumns(
  handleApprovePayment: (case_id: number) => void,
  isPending: boolean,
  isRefetching: boolean
) {
  const [selectID, setSelectID] = useState<number | null>(null);
  return [
    {
      accessorFn: (row: any) => row.case?.ref_id || row.case?.temp_id,
      id: "case_id",
      cell: (info: any) => {
        return (
          <div
            className="text-xs truncate w-32 xl:36 2xl:48"
            title={info.getValue()}
          >
            {info.getValue() || "--"}
          </div>
        );
      },
      width: "95px",
      maxWidth: "95px",
      minWidth: "95px",
      header: () => <span className="text-sm ">File ID</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.case?.user?.email,
      id: "email",
      cell: (info: any) => {
        return (
          <div
            className="text-xs truncate w-32 xl:36 2xl:48"
            title={info.getValue()}
          >
            {info.getValue() || "--"}
          </div>
        );
      },
      width: "140px",
      maxWidth: "140px",
      minWidth: "140px",
      header: () => <span className="text-sm break-words">Email</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.case?.user,
      id: "full_name",
      cell: (info: any) => {
        const user = info.getValue();
        const fullName = user
          ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
          : "--";
        return (
          <div className="text-xs truncate w-32 2xl:56 3xl:60" title={fullName}>
            {fullName}
          </div>
        );
      },
      width: "130px",
      maxWidth: "130px",
      minWidth: "130px",
      header: () => <span className="text-sm">Point of Contact</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.case?.service?.category,
      id: "issue",
      cell: (info: any) => {
        return <OverflowContentTooltip text={info.getValue() || "--"} />;
      },
      width: "125px",
      maxWidth: "125px",
      minWidth: "125px",
      header: () => <span className="text-sm">Service Type</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row?.payment_method,
      id: "payment_method",
      cell: (info: any) => {
        const value = info.getValue();
        return <span className="text-sm">{value ? value : "--"}</span>;
      },
      width: "130px",
      maxWidth: "130px",
      minWidth: "130px",
      header: () => <span className="text-sm">Payment Method</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row?.payment_date,
      id: "updated_at",
      cell: (info: any) => {
        const value = info.getValue();
        return (
          <span className="text-xs">
            {value ? formatDateWithTime(value) : "--"}
          </span>
        );
      },
      width: "140px",
      maxWidth: "140px",
      minWidth: "140px",
      header: () => <span className="text-smd">Paid On</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.paid_amount,
      id: "amount",
      cell: (info: any) => {
        return (
          <span className="text-xs tabular-nums">
            {" "}
            &#8377; {info.getValue() || "--"}
          </span>
        );
      },
      width: "80px",
      maxWidth: "80px",
      minWidth: "80px",
      header: () => <span className="text-sm">Amount</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) => row?.is_payment_received,
      id: "is_payment_received",
      cell: (info: any) => {
        return info.getValue() ? (
          <Button className="text-xs h-fit rounded-none [&_svg]:size-3 text-white px-2 py-1 bg-green-600 hover:bg-green-600 flex gap-1 w-20">
            <ApprovedIcon /> Verified
          </Button>
        ) : (
          <Button
            className="text-xs px-2 py-1 rounded-none hover:bg-gray-500 h-fit w-20 bg-gray-200"
            onClick={() => {
              handleApprovePayment(info.row.original.id);
              setSelectID(info.row.original.id);
            }}
          >
            {(isPending || isRefetching) &&
            selectID === info.row.original.id ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              "Confirm"
            )}
          </Button>
        );
      },
      width: "135px",
      maxWidth: "135px",
      minWidth: "135px",
      header: () => <span className="text-sm">Payment Received</span>,
      footer: (props: any) => props.column.id,
    },
  ];
}
