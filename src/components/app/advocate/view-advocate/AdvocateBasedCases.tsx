import LoadingComponent from "@/components/core/Loading";
import TanStackTable from "@/components/core/TanstackTable";
import { getAllCombinedCasesAPI } from "@/http/services/advocate";
import { PaginationType } from "@/lib/interfaces/pagination";
import { addSerial } from "@/utils/helpers/app";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import AdvisorCasesColumns from "./AdvocateCasesColumn";

const AdvisorBasedCases = ({
  heightClass = "h-[calc(100vh-385px)]",
}: {
  heightClass?: string;
}) => {
  const location = useLocation();
  const router = useRouter();
  const searchParams = new URLSearchParams(location.search);
  const params = useParams({ strict: false });
  const advocate_id = params?.advocate_id;
  const manager_id = params?.manager_id;
  const [pagination, setPagination] = useState<PaginationType>({
    current_page: Number(searchParams.get("page")) || 1,
    page_size: Number(searchParams.get("page_size")) || 15,
  });

  const legalOpinionColumns = AdvisorCasesColumns();

  const { isLoading: isCasesFetching, data: fetchedLegalOpinions } = useQuery({
    queryKey: [
      "legal-opinions",
      pagination.current_page,
      pagination.page_size,
      advocate_id,
    ],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const queryParams = {
        page: pagination.current_page,
        page_size: pagination.page_size,
        advocate_id: advocate_id,
        manager_id: manager_id,
      };
      try {
        const response = await getAllCombinedCasesAPI(queryParams);
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Failed to fetch legal opinions");
        }

        const { records, pagination_info } = response?.data?.data;
        const responseAfterSerial =
          addSerial(
            records,
            pagination_info.current_page,
            pagination_info.page_size
          ) || [];
        return { records: responseAfterSerial, pagination_info };
      } catch (error) {
        throw new Error("Failed to fetch legal opinions");
      }
    },
  });

  const getLegalOpinions = ({
    page,
    page_size,
  }: {
    page: number;
    page_size: number;
  }) => {
    setPagination((prev) => ({
      ...prev,
      current_page: page,
      page_size: page_size,
    }));
    router.navigate({
      to: location.pathname,
      search: {
        ...Object.fromEntries(searchParams),
        page,
        page_size,
        service_type: "Legal opinion",
      },
    });
  };

  return (
    <div className="relative h-[calc(100vh-330px)] overflow-hidden">
      {isCasesFetching ? (
        <LoadingComponent
          loading={isCasesFetching}
          message="Fetching legal opinions..."
        />
      ) : (
        <>
          <div className="w-full space-x-2">
            <div className="p-2 space-y-6 bg-white">
              <div>
                <TanStackTable
                  data={fetchedLegalOpinions?.records || []}
                  columns={legalOpinionColumns}
                  paginationDetails={
                    fetchedLegalOpinions?.pagination_info || {}
                  }
                  getData={getLegalOpinions}
                  loading={isCasesFetching}
                  noDataLabel="Legal Opinions"
                  removeSortingForColumnIds={[
                    "service_id",
                    "status",
                    "due_date",
                    "service_type",
                    "organisation_name",
                    "actions",
                    "advocate_name",
                    "customer_name",
                  ]}
                  heightClass={heightClass}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdvisorBasedCases;
