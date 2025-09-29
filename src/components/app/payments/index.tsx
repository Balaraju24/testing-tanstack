import TanStackTable from "@/components/core/TanstackTable";
import NoPayemntsData from "@/components/icons/no-payments-data";
import {
  getAllPaymentsAPI,
  paymentRecievedApprovalAPI,
} from "@/http/services/payment";
import { DEFAULT_HEIGHT_CLASS } from "@/lib/constants/advocate";
import { heightClassProps } from "@/lib/interfaces/advocate";
import { addSerial } from "@/utils/helpers/app";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import SearchFilter from "../../core/SearchFilter";
import PaymentsColumns from "./PaymentColumns";

const PaymentsList = ({
  heightClass = DEFAULT_HEIGHT_CLASS,
}: heightClassProps) => {
  const tableRef = useRef<any>(null);
  const router = useRouter();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchString, setSearchString] = useState<any>(
    searchParams.get("search_string") || ""
  );
  const [debounceSearchString, setDebounceSearchString] = useState<string>(
    searchParams.get("search_string") || ""
  );
  const [pagination, setPagination] = useState<any>({
    current_page: Number(searchParams.get("page")) || 1,
    page_size: Number(searchParams.get("page_size")) || 15,
  });
  const [savedScrollTop, setSavedScrollTop] = useState<number | null>(null);

  const {
    isLoading,
    data: paymentData,
    refetch: refetchPayment,
    isRefetching,
  } = useQuery({
    queryKey: ["Payment", pagination, debounceSearchString],
    queryFn: async () => {
      let queryParams: any = {
        page: pagination.current_page,
        page_size: pagination.page_size,
        status: "PAID",
        ...(debounceSearchString && { search_string: debounceSearchString }),
      };

      router.navigate({
        to: "/payments",
        search: queryParams,
      });

      try {
        const response = await getAllPaymentsAPI(queryParams);
        if (response.status === 200 || response.status === 201) {
          const { records, pagination_info } = response?.data?.data;
          let responseAfterSerial =
            addSerial(
              records,
              pagination_info.current_page,
              pagination_info.page_size
            ) || [];

          return { records: responseAfterSerial, pagination_info };
        } else {
          throw new Error(`API returned status: ${response.status}`);
        }
      } catch (error) {
        throw new Error(`Failed to fetch users: ${(error as Error).message}`);
      }
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  const { mutate: mutatePayment, isPending } = useMutation({
    mutationKey: ["mutatePayment"],
    mutationFn: async ({
      case_id,
      payload,
    }: {
      case_id: number;
      payload: any;
    }) => {
      const response = await paymentRecievedApprovalAPI(case_id, payload);
      return response;
    },
    onMutate: () => {
      if (tableRef.current) {
        setSavedScrollTop(tableRef.current.scrollTop);
      }
    },
    onSuccess: () => {
      refetchPayment();
      if (tableRef.current && savedScrollTop !== null) {
        tableRef.current.scrollTop = savedScrollTop; // restore saved scroll position
      }
    },
  });

  const getAllPayments = async ({
    page,
    page_size,
  }: {
    page: number;
    page_size: number;
  }) => {
    setPagination({ current_page: page, page_size });
  };

  const handleApprovePayment = (case_id: number) => {
    const payload = {
      is_payment_received: "true",
    };
    mutatePayment({ case_id, payload });
  };

  const paymentColumns = PaymentsColumns(
    handleApprovePayment,
    isPending,
    isRefetching
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setPagination((prev: any) => ({
        ...prev,
        current_page: searchString ? prev.current_page : 1,
      }));

      setDebounceSearchString(searchString);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchString]);

  return (
    <div className="overflow-hidden h-full relative">
      <div className="flex justify-end gap-x-8 mb-2">
        <SearchFilter
          searchString={searchString}
          setSearchString={setSearchString}
          title="Search by Point of Contact"
        />
      </div>

      <div className="">
        {!isLoading && !paymentData?.records?.length ? (
          <div className="h-[calc(100vh-180px)] flex flex-col items-center justify-center w-full relative">
            <NoPayemntsData className="w-1/4" />
            No Payments Found
          </div>
        ) : (
          <div className="">
            <TanStackTable
              data={paymentData?.records || []}
              columns={paymentColumns}
              paginationDetails={paymentData?.pagination_info || {}}
              getData={getAllPayments}
              loading={isLoading}
              removeSortingForColumnIds={[
                "case_id",
                "email",
                "full_name",
                "issue",
                "payment_method",
                "updated_at",
                "amount",
                "is_payment_received",
              ]}
              heightClass={heightClass}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsList;
