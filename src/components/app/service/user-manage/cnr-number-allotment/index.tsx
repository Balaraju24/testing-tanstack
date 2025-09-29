import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

import { singleServiceAPI } from "@/http/services/service";

import ManageCaseHeader from "../../ManageCaseHeader";
import GetCaseNotes from "../../get-case-files/GetCaseNotes";

const UserCNRNumberAllotment = () => {
  const { service_id } = useParams({ strict: false });

  const { data: caseDetails } = useQuery({
    queryKey: ["case-details", service_id],
    enabled: !!service_id,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        if (!service_id) return;
        const response = await singleServiceAPI(service_id as string);
        if (response.status === 200 || response.status === 201) {
          const { data } = response?.data;
          return data;
        }
      } catch {
        throw new Error("Failed to fetch case data");
      }
    },
  });

  return (
    <div className="h-full">
      <div className="">
        <ManageCaseHeader
          caseStage="CTPG"
          caseSubStage="CTPG#CNRA"
          showUploadButton={false}
          showNoteButton={false}
        />
      </div>
      <div className="p-2 relative w-full h-[calc(100%-60px)] overflow-auto">
        {caseDetails?.cnr_number ? (
          <div className="flex gap-3">
            {caseDetails?.cnr_number && (
              <div className="p-2 inline-block text-sm bg-gray-100 w-full">
                <span className="text-black ">CNR Number :</span>{" "}
                <span className="text-gray-600">{caseDetails?.cnr_number}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center  text-lg h-[calc(100%-80px)] flex items-center justify-center ">
            <div>
              Currently, this case <strong> cnr </strong> number is not alloted.
            </div>
          </div>
        )}

        <GetCaseNotes />
      </div>
    </div>
  );
};

export default UserCNRNumberAllotment;
