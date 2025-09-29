import NoOrganizationIcon from "@/components/icons/NoOrganizationIcon";
import OrganizationIcon from "@/components/icons/OrganizationIcon";
import { OrganizationGridProps } from "@/lib/interfaces/litigation";
import { Loader2 } from "lucide-react";

export const OrganizationGrid = ({
  organizations,
  selectedOrganization,
  onOrganizationSelect,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  searchTerm,
}: OrganizationGridProps) => {
  if (isLoading) {
    return (
      <div className="flex max-w-5xl h-[calc(100vh-400px)] overflow-hidden justify-center items-center py-8 text-center self-center ">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
        <span className="ml-2 text-gray-500">Loading organizations...</span>
      </div>
    );
  }

  if (organizations.length === 0 && searchTerm.length > 0) {
    return (
      <div className="flex max-w-5xl h-[calc(100vh-400px)] overflow-hidden justify-center items-center py-8 text-center self-center ">
        <div className="flex flex-col  py-12">
          <NoOrganizationIcon className="h-40 w-40 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg font-normal">
            No organizations found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {organizations.map((org: any, index: number) => {
          const isSelected = selectedOrganization?.id === org.id;
          return (
            <div
              key={index}
              onClick={() => onOrganizationSelect(org)}
              className={`p-2 max-w-72 cursor-pointer transition-all duration-200 ${
                isSelected ? "bg-black text-white" : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="font-normal text-base 2xl:text-lg flex justify-center uppercase leading-relaxed">
                  <>
                    <OrganizationIcon
                      className={`h-6 w-6 mx-3 mt-1 ${isSelected ? "text-white" : "text-gray-800"}`}
                    />
                  </>
                  <div> {org.organisation_name}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {hasNextPage && (
        <div className="flex max-w-5xl justify-center mb-8">
          <button
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            className="px-6 py-2 text-sm border cursor-pointer border-gray-300 text-gray-700 bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFetchingNextPage ? (
              <div className="flex items-center">
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Loading...
              </div>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
};
