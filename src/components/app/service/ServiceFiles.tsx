import { UseContextAPI } from "@/components/context/Provider";
import LoadingComponent from "@/components/core/Loading";
import NoFilesData from "@/components/icons/files-no-data";
import { docsViewAPI, getAllDocsAPIV2 } from "@/http/services/service";
import { CaseFile, GroupedFile } from "@/lib/interfaces/manage";
import { NotesReadStatus } from "@/lib/interfaces/service";
import { userStore } from "@/store/userDetails";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import FileCard from "./FilesCategory";
import TabValuesForViewCase from "./TabValuesForViewCase";

const ServiceFiles = () => {
  const { service_id } = useParams({ strict: false });
  const userDetails = useStore(userStore, (state: any) => state["user"]);
  const userType = userDetails?.id;
  const { caseStagesData } = UseContextAPI();

  const {
    isLoading,
    data: filesDetails,
    refetch,
  } = useQuery({
    queryKey: ["file-details", service_id],
    queryFn: async () => {
      if (!service_id) return;
      const response = await getAllDocsAPIV2(service_id);
      if (response.status === 200 || response.status === 201) {
        return response.data?.data;
      } else {
        throw new Error("Failed to fetch documents");
      }
    },
    enabled: !!service_id,
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateFilesView } = useMutation({
    mutationFn: async (documentId: Number) => {
      const payload = { doc_id: Number(documentId) };
      if (service_id) {
        const response = await docsViewAPI(service_id, payload);
        return response?.data;
      }
    },
    onSuccess: () => {
      refetch();
    },
  });

  const groupBySubstage = filesDetails?.reduce(
    (group: GroupedFile, file: any) => {
      if (file.key === null || file.download_url === null) {
        return group;
      }

      const substage = file.case_sub_stage ?? "Offline Payments";

      if (substage === "CSFG#ADDO" || substage === "QURI#MDSC") {
        const category = file.category ?? "Uncategorized";

        if (!group[substage]) {
          group[substage] = {};
        }

        const subGroup = group[substage] as { [category: string]: File[] };

        if (!subGroup[category]) {
          subGroup[category] = [];
        }

        subGroup[category].push(file);
      } else {
        if (!group[substage]) {
          group[substage] = [];
        }

        (group[substage] as File[]).push(file);
      }

      return group;
    },
    {} as GroupedFile
  );

  const handleDocumentClick = (documentId: number) => {
    const isRecordUnread = filesDetails?.some(
      (record: any) =>
        record.id === documentId &&
        record?.doc_read_status?.some(
          (item: NotesReadStatus) => !item.is_seen && item.user_id === userType
        )
    );

    if (isRecordUnread) {
      mutateFilesView(documentId);
    }
  };

  return (
    <div className="border border-gray-300">
      <TabValuesForViewCase />
      <div className="h-[calc(100vh-155px)] relative">
        {isLoading ? (
          <LoadingComponent loading={isLoading} message="Files..." />
        ) : (
          <div className="p-4 h-full overflow-auto">
            {Object.keys(groupBySubstage).length === 0 ? (
              <div className="text-center text-lg h-full flex items-center justify-center">
                <NoFilesData className="w-1/3" />
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(groupBySubstage).map(([substage, group]) => (
                  <div
                    key={substage}
                    className="space-y-3 border-b last:border-b-0 pb-4 border-gray-200 "
                  >
                    <h3 className="font-medium text-md leading-none capitalize">
                      {caseStagesData?.sub_stages?.find(
                        (sub: any) => sub.code === substage
                      )?.title ||
                        substage ||
                        "--"}
                    </h3>

                    {Array.isArray(group) ? (
                      <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {group.map((file) => (
                          <FileCard
                            key={file.id}
                            file={file}
                            userType={userType}
                            handleDocumentClick={handleDocumentClick}
                          />
                        ))}
                      </div>
                    ) : (
                      Object.entries(group as Record<string, CaseFile[]>).map(
                        ([category, files]) => (
                          <div key={category} className="space-y-2 ml-6">
                            <ul className="list-disc pl-6 marker:text-gray-900">
                              <li className="text-sm font-semibold text-gray-600">
                                {category}
                              </li>
                            </ul>
                            <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                              {files.map((file) => (
                                <FileCard
                                  key={file.id}
                                  file={file}
                                  userType={userType}
                                  handleDocumentClick={handleDocumentClick}
                                />
                              ))}
                            </div>
                          </div>
                        )
                      )
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceFiles;
